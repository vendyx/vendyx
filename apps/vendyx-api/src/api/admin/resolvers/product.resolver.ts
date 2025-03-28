import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import { CreateProductInput, ListInput, UpdateProductInput } from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { ProductService } from '@/business/product/product.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

@UseGuards(UserJwtAuthGuard)
@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Query('products')
  async products(@Args('input') input?: ListInput) {
    const [result, total] = await Promise.all([
      this.productService.find(input),
      this.productService.count()
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @Query('productsByVariantIds')
  async productsByVariantIds(@Args('ids') ids: ID[], @Args('input') input?: ListInput) {
    const [result, total] = await Promise.all([
      this.productService.find(input, undefined, ids),
      this.productService.count(input, undefined, ids)
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @Query('product')
  async product(@Args('id') id: ID, @Args('slug') slug: string) {
    return this.productService.findUnique(id, slug);
  }

  @Mutation('createProduct')
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @Mutation('updateProduct')
  async updateProduct(@Args('id') id: string, @Args('input') input: UpdateProductInput) {
    return this.productService.update(id, input);
  }

  @Mutation('softRemoveProduct')
  async softRemove(@Args('ids') ids: string[]) {
    return this.productService.softRemove(ids);
  }
}
