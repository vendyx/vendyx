import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CurrentCustomer,
  TCurrentCustomer
} from '@/api/shared/decorator/current-customer.decorator';
import { CustomerJwtAuthGuard } from '@/api/shared/guards/customer.guard';
import { ShopApiKeyGuard } from '@/api/shared/guards/shop-api-key.guard';
import { AddToFavoritesInput, ProductListInput } from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { FavoriteService } from '@/business/favorite/favorite.service';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';
import { ID } from '@/persistence/types/scalars.type';

@UseGuards(ShopApiKeyGuard, CustomerJwtAuthGuard)
@Resolver('Favorite')
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Query('favorites')
  async favorites(
    @CurrentCustomer() customer: TCurrentCustomer,
    @Args('input') input: ProductListInput
  ) {
    const [favorites, total] = await Promise.all([
      this.favoriteService.find(customer.id, input),
      this.favoriteService.count(customer.id, input)
    ]);

    return new ListResponse(favorites, favorites.length, { total });
  }

  @Mutation('addToFavorites')
  async addToFavorites(
    @CurrentCustomer() customer: TCurrentCustomer,
    @Args('input') input: AddToFavoritesInput
  ) {
    const result = await this.favoriteService.add(customer.id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], variant: result };
  }

  @Mutation('removeFromFavorites')
  async removeFromFavorites(@CurrentCustomer() customer: TCurrentCustomer, @Args('ids') ids: ID[]) {
    return this.favoriteService.remove(customer.id, ids);
  }
}
