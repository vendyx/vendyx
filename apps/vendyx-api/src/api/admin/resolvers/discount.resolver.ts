import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import {
  CreateDiscountInput,
  DiscountListInput,
  UpdateDiscountInput
} from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { DiscountService } from '@/business/discount/discount.service';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';
import { ID } from '@/persistence/types/scalars.type';

@UseGuards(UserJwtAuthGuard)
@Resolver('Discount')
export class DiscountResolver {
  constructor(private readonly discountService: DiscountService) {}

  @Query('discounts')
  async discounts(@Args('input') input?: DiscountListInput) {
    const [discounts, total] = await Promise.all([
      this.discountService.find(input),
      this.discountService.count()
    ]);

    return new ListResponse(discounts, discounts.length, { total });
  }

  @Query('discount')
  async discount(@Args('id') id: string) {
    return this.discountService.findById(id);
  }

  @Mutation('createDiscount')
  async createDiscount(@Args('input') input: CreateDiscountInput) {
    const result = await this.discountService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { discount: result, apiErrors: [] };
  }

  @Mutation('updateDiscount')
  async updateDiscount(@Args('id') id: ID, @Args('input') input: UpdateDiscountInput) {
    const result = await this.discountService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { discount: result, apiErrors: [] };
  }

  @Mutation('removeDiscounts')
  async removeDiscounts(@Args('ids') ids: ID[]) {
    await this.discountService.remove(ids);
    return true;
  }
}
