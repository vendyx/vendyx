import { Inject } from '@nestjs/common';
import { Collection, CollectionContentType, PrismaPromise } from '@prisma/client';

import {
  CollectionFilters,
  CollectionListInput,
  CreateCollectionInput,
  UpdateCollectionInput
} from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

import { clean } from '../shared/utils/clean.utils';
import { getSlugBy } from '../shared/utils/slug.utils';

export class CollectionService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async find(input?: CollectionListInput) {
    return this.prisma.collection.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        ...clean(input?.filters ?? {}),
        name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {},
        parentId: null
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async count(input?: CollectionListInput) {
    return this.prisma.collection.count({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        ...clean(input?.filters ?? {}),
        name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {}
      }
    });
  }

  async findUnique(id: ID, slug: string, filters?: CollectionFilters) {
    return this.prisma.collection.findUnique({ where: { id, slug, ...clean(filters ?? {}) } });
  }

  async create(input: CreateCollectionInput) {
    const { assets, products, contentType, subCollections, ...rest } = input;
    const slug = await this.validateAndParseSlug(input.name);

    return await this.prisma.collection.create({
      data: {
        ...clean(rest),
        contentType,
        slug,
        assets: assets
          ? { create: assets.map(asset => ({ assetId: asset.id, order: 0 })) }
          : undefined,
        products:
          products && contentType === CollectionContentType.PRODUCTS
            ? { create: products.map(product => ({ productId: product, order: 0 })) }
            : undefined,
        subCollections:
          subCollections && contentType === CollectionContentType.COLLECTIONS
            ? { connect: subCollections.map(subCollection => ({ id: subCollection })) }
            : undefined
      }
    });
  }

  async update(id: ID, input: UpdateCollectionInput) {
    const { assets, products, subCollections, ...rest } = input;
    const { contentType } = await this.prisma.collection.findUniqueOrThrow({ where: { id } });

    const isModifyingSubCollection =
      Array.isArray(subCollections) && contentType === CollectionContentType.COLLECTIONS;

    let subCollectionStored: Collection[] = [];
    let subCollectionsToStore: Collection[] = [];

    // only fetch needed data for sub collections if we are modifying them
    if (isModifyingSubCollection) {
      subCollectionStored = await this.prisma.collection.findMany({
        where: { parentId: id }
      });
      subCollectionsToStore = await this.prisma.collection.findMany({
        where: { id: { in: subCollections ?? [] } }
      });
    }

    const subCollectionsToCreate = subCollectionsToStore.filter(
      s => s.contentType === CollectionContentType.PRODUCTS
    );
    const subCollectionsToRemove = subCollectionStored
      .map(subCollection => subCollection.id)
      .filter(subCollection => !subCollections?.includes(subCollection));

    const transaction: PrismaPromise<any>[] = [
      this.prisma.collection.update({
        where: { id },
        data: {
          ...clean(rest),
          slug: input.name ? await this.validateAndParseSlug(input.name) : undefined,
          assets: assets
            ? {
                upsert: assets.map(asset => ({
                  where: { collectionId_assetId: { assetId: asset.id, collectionId: id } },
                  create: { assetId: asset.id, order: 0 },
                  update: { order: 0 }
                }))
              }
            : undefined,
          products:
            products && contentType === CollectionContentType.PRODUCTS
              ? {
                  connectOrCreate: products.map(product => ({
                    where: { productId_collectionId: { productId: product, collectionId: id } },
                    create: { productId: product }
                  }))
                }
              : undefined,
          subCollections:
            subCollectionsToCreate && contentType === CollectionContentType.COLLECTIONS
              ? { connect: subCollectionsToCreate.map(subCollection => ({ id: subCollection.id })) }
              : undefined
        }
      })
    ];

    // if products is an array (meaning was modified) then remove all products that are not in the new list
    if (Array.isArray(products) && contentType === CollectionContentType.PRODUCTS) {
      transaction.unshift(
        this.prisma.productCollection.deleteMany({
          where: { productId: { notIn: products ?? [] }, collectionId: id }
        })
      );
    }

    if (subCollectionsToRemove.length && contentType === CollectionContentType.COLLECTIONS) {
      transaction.unshift(
        this.prisma.collection.updateMany({
          where: { id: { in: subCollectionsToRemove } },
          data: { parentId: null }
        })
      );
    }

    // if assets is an array (meaning was modified) then remove all assets that are not in the new list
    if (Array.isArray(assets)) {
      transaction.unshift(
        this.prisma.collectionAsset.deleteMany({
          where: { assetId: { notIn: assets?.map(a => a.id) ?? [] }, collectionId: id }
        })
      );
    }

    const result = await this.prisma.$transaction(transaction);

    // always the last result is the updated collection
    return result[result.length - 1];
  }

  async remove(ids: ID[]) {
    const transactions = ids.map(id => [
      this.prisma.collectionAsset.deleteMany({ where: { collectionId: id } }),
      this.prisma.productCollection.deleteMany({ where: { collectionId: id } }),
      this.prisma.collection.delete({ where: { id } })
    ]);

    await this.prisma.$transaction(transactions.reduce((acc, val) => acc.concat(val), []));

    return true;
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const collectionCount = await this.prisma.collection.count({ where: { name } });

    if (!collectionCount) return slug;

    return slug + '-' + collectionCount;
  }
}
