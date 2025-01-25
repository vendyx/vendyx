import { Inject } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';

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
        name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {}
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
    const { assets, products, ...rest } = input;
    const slug = await this.validateAndParseSlug(input.name);

    return await this.prisma.collection.create({
      data: {
        ...clean(rest),
        slug,
        assets: assets
          ? { create: assets.map(asset => ({ assetId: asset.id, order: 0 })) }
          : undefined,
        products: products
          ? { create: products.map(product => ({ productId: product, order: 0 })) }
          : undefined
      }
    });
  }

  async update(id: ID, input: UpdateCollectionInput) {
    const { assets, products, ...rest } = input;

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
          products: products
            ? {
                connectOrCreate: products.map(product => ({
                  where: { productId_collectionId: { productId: product, collectionId: id } },
                  create: { productId: product }
                }))
              }
            : undefined
        }
      })
    ];

    if (Array.isArray(products)) {
      transaction.unshift(
        this.prisma.productCollection.deleteMany({
          where: { productId: { notIn: products ?? [] }, collectionId: id }
        })
      );
    }

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
