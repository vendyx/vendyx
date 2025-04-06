import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Shop } from '@prisma/client';

import { CurrentShop, TCurrentShop } from '@/api/shared/decorator/current-shop.decorator';
import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import { CreateShopInput, ListInput, UpdateShopInput } from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';
import { ShopService } from '@/business/shop/shop.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';

@UseGuards(UserJwtAuthGuard)
@Resolver('Shop')
export class ShopResolver {
  constructor(
    private readonly shopService: ShopService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Query('shop')
  async shop(@Args('slug') slug: string) {
    return this.shopService.findBySlug(slug);
  }

  @Query('shops')
  async shops(@Args('input') input?: ListInput) {
    const [result, total] = await Promise.all([
      this.shopService.find(input),
      this.shopService.count(input)
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @Mutation('createShop')
  async createShop(@Args('input') input: CreateShopInput) {
    const result = await this.shopService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], shop: result };
  }

  @Mutation('updateShop')
  async updateShop(@Args('shopSlug') shopSlug: string, @Args('input') input: UpdateShopInput) {
    const result = await this.shopService.update(shopSlug, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], shop: result };
  }

  @Mutation('generateShopApiKey')
  async generateShopApiKey(@CurrentShop() shop: TCurrentShop) {
    const result = await this.shopService.generateShopApiKey(shop.id);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], shop: result };
  }

  @ResolveField('owner')
  async owner(@Parent() shop: Shop) {
    return this.prisma.shop.findUnique({ where: { id: shop.id } }).owner();
  }
}
