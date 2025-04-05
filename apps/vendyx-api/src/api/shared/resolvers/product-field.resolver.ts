import { Inject } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from '@prisma/client';

import { clean } from '@/business/shared/utils/clean.utils';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';

import { ListInput } from '../types/gql.types';
import { ListResponse } from '../utils/list-response';

@Resolver('Product')
export class ProductFieldResolver {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  @ResolveField('variants')
  async variants(@Parent() product: Product, @Args('input') input?: ListInput) {
    const query = {
      where: { productId: product.id }
    };

    const [result, total] = await Promise.all([
      this.prisma.variant.findMany({
        ...query,
        ...clean(input ?? {}),
        orderBy: { createdAt: 'asc' }
      }),
      this.prisma.variant.count(query)
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @ResolveField('options')
  async options(@Parent() product: Product) {
    const result = await this.prisma.productOption.findMany({
      where: { productId: product.id, option: { deletedAt: null } },
      include: { option: true }
    });

    return result.map(({ option }) => option).sort((a, b) => a.order - b.order);
  }

  @ResolveField('assets')
  async assets(@Parent() product: Product, @Args('input') input?: ListInput) {
    const [result, count] = await Promise.all([
      this.prisma.productAsset.findMany({
        where: { productId: product.id },
        include: { asset: true },
        orderBy: { order: 'asc' },
        ...clean(input ?? {})
      }),
      this.prisma.productAsset.count({ where: { productId: product.id } })
    ]);

    const assetsList = result.map(r => ({ ...r.asset, order: r.order }));
    return new ListResponse(assetsList, assetsList.length, { total: count });
  }

  @ResolveField('tags')
  async tags(@Parent() product: Product) {
    const result = await this.prisma.productTag.findMany({
      where: { productId: product.id },
      select: { tag: true }
    });

    return result.map(({ tag }) => tag);
  }
}
