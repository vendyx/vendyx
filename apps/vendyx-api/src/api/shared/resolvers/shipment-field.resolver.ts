import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';

import { Shipment } from '../types/gql.types';

@Resolver('Shipment')
export class ShipmentFieldResolver {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  @ResolveField('discounts')
  async discounts(@Parent() shipment: Shipment) {
    const result = await this.prisma.shipment.findUnique({
      where: { id: shipment.id },
      select: { activeDiscounts: true }
    });

    return result?.activeDiscounts;
  }
}
