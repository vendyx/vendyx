import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import { MarkOrderAsShippedInput, OrderListInput } from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { OrderService } from '@/business/order/order.service';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';
import { ID } from '@/persistence/types/scalars.type';

@UseGuards(UserJwtAuthGuard)
@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query('order')
  async order(@Args('id') id: ID, @Args('code') code: string) {
    return this.orderService.findUnique(id, code);
  }

  @Query('orders')
  async orders(@Args('input') input: OrderListInput) {
    const [result, total] = await Promise.all([
      this.orderService.find(input),
      this.orderService.count(input)
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @Mutation('markOrderAsShipped')
  async markOrderAsShipped(@Args('id') orderId: ID, @Args('input') input: MarkOrderAsShippedInput) {
    const result = await this.orderService.markAsShipped(orderId, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('markAsReadyForPickup')
  async markAsReadyForPickup(@Args('id') orderId: ID) {
    const result = await this.orderService.markAsReadyForPickup(orderId);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('markOrderAsDelivered')
  async markOrderAsDelivered(@Args('id') orderId: ID) {
    const result = await this.orderService.markAsDelivered(orderId);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('cancelOrder')
  async cancelOrder(@Args('id') orderId: ID) {
    const result = await this.orderService.cancel(orderId);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }
}
