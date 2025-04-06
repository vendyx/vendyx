import { randomUUID } from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ProductFilters, ProductListInput } from '@/api/shared/types/gql.types';
import { clean } from '@/business/shared/utils/clean.utils';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';
import { ID } from '../types/scalars.type';

@Injectable()
export class ProductRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async findMany(input?: ProductListInput & { collectionId?: ID; variantsIds?: ID[] }) {
    return await this.prisma.product.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {},
        archived: clean(input?.filters?.archived ?? {}),
        enabled: clean(input?.filters?.enabled ?? {}),
        ProductCollection: input?.collectionId
          ? { some: { collectionId: input.collectionId } }
          : undefined,
        variants: input?.variantsIds ? { some: { id: { in: input.variantsIds } } } : undefined
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  findBySlug(slug: string, filters?: ProductFilters) {
    return this.prisma.product.findUnique({
      where: {
        slug,
        name: filters?.name ? { ...clean(filters.name), mode: 'insensitive' } : {},
        archived: clean(filters?.archived ?? {}),
        enabled: clean(filters?.enabled ?? {})
      }
    });
  }

  findById(id: string, filters?: ProductFilters) {
    return this.prisma.product.findUnique({
      where: {
        id,
        name: filters?.name ? { ...clean(filters.name), mode: 'insensitive' } : {},
        archived: clean(filters?.archived ?? {}),
        enabled: clean(filters?.enabled ?? {})
      }
    });
  }

  count(input?: ProductListInput & { collectionId?: ID; variantsIds?: ID[] }) {
    return this.prisma.product.count({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {},
        archived: clean(input?.filters?.archived ?? {}),
        enabled: clean(input?.filters?.enabled ?? {}),
        ProductCollection: input?.collectionId
          ? { some: { collectionId: input.collectionId } }
          : undefined,
        variants: input?.variantsIds ? { some: { id: { in: input.variantsIds } } } : undefined
      }
    });
  }

  insert(input: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data: input });
  }

  update(id: string, input: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({ where: { id }, data: input });
  }

  softDelete(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date(), slug: randomUUID() }
    });
  }

  softDeleteVariants(productId: string) {
    return this.prisma.variant.updateMany({
      where: { productId },
      data: { deletedAt: new Date() }
    });
  }

  /**
   * Hard delete all options and its values from a product and variants
   */
  async hardDeleteOptions(productId: string) {
    const optionsToDelete = await this.prisma.productOption.findMany({ where: { productId } });
    const optionsIds = optionsToDelete.map(o => o.optionId);

    await this.prisma.variantOptionValue.deleteMany({
      where: { optionValue: { optionId: { in: optionsIds } } }
    });
    await this.prisma.optionValue.deleteMany({
      where: { optionId: { in: optionsIds } }
    });

    await this.prisma.productOption.deleteMany({ where: { productId } });
    await this.prisma.option.deleteMany({
      where: { id: { in: optionsIds } }
    });
  }

  async findAssets(productId: string) {
    return this.prisma.productAsset.findMany({ where: { productId } });
  }

  async findTags(productId: string) {
    return this.prisma.productTag.findMany({ where: { productId } });
  }

  async hardDeleteAssets(productId: string) {
    const assetsToDelete = await this.prisma.productAsset.findMany({ where: { productId } });
    const assetsIds = assetsToDelete.map(a => a.assetId);

    await this.prisma.productAsset.deleteMany({ where: { productId } });
    await this.prisma.asset.deleteMany({
      where: {
        id: { in: assetsIds }
      }
    });
  }
}
