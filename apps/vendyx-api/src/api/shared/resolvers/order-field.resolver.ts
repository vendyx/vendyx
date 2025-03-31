import { Inject } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from '@prisma/client';

import { formatOrderCode } from '@/business/order/order.utils';
import { clean } from '@/business/shared/utils/clean.utils';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';

import { ListInput } from '../types/gql.types';
import { ListResponse } from '../utils/list-response';

@Resolver('Order')
export class OrderFieldResolver {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  @ResolveField('lines')
  async lines(@Parent() order: Order, @Args('input') input?: ListInput) {
    const [result, total] = await Promise.all([
      this.prisma.orderLine.findMany({
        ...clean(input ?? {}),
        where: { orderId: order.id },
        orderBy: { createdAt: 'asc' }
      }),
      this.prisma.orderLine.count({
        where: { orderId: order.id }
      })
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @ResolveField('customer')
  async customer(@Parent() order: Order) {
    const result = await this.prisma.order.findUnique({
      where: { id: order.id },
      select: { customer: true }
    });

    return result?.customer;
  }

  @ResolveField('shipment')
  async shipment(@Parent() order: Order) {
    const result = await this.prisma.order.findUnique({
      where: { id: order.id },
      select: { shipment: true }
    });

    return result?.shipment;
  }

  @ResolveField('payment')
  async payment(@Parent() order: Order) {
    const result = await this.prisma.order.findUnique({
      where: { id: order.id },
      select: { payment: true }
    });

    return result?.payment;
  }

  @ResolveField('code')
  async code(@Parent() order: Order) {
    const { code } = order;

    return formatOrderCode(code);
  }

  @ResolveField('discounts')
  async discounts(@Parent() order: Order) {
    const result = await this.prisma.order.findUnique({
      where: { id: order.id },
      select: { activeDiscounts: true }
    });

    return result?.activeDiscounts;
  }
}
