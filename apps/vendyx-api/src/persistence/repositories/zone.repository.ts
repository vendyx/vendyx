import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';

@Injectable()
export class ZoneRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  find() {
    return this.prisma.zone.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  findStates(zoneId: string) {
    return this.prisma.stateZone.findMany({
      where: { zoneId }
    });
  }

  findById(id: string) {
    return this.prisma.zone.findUnique({
      where: { id }
    });
  }

  insert(input: Prisma.ZoneCreateInput) {
    return this.prisma.zone.create({ data: input });
  }

  async update(id: string, input: Prisma.ZoneUpdateInput) {
    return await this.prisma.zone.update({
      where: { id },
      data: input
    });
  }

  remove(id: string) {
    return this.prisma.zone.delete({
      where: { id }
    });
  }

  async removeAllStates(zoneId: string) {
    await this.prisma.stateZone.deleteMany({
      where: { zoneId }
    });
  }

  async removeAllShippingMethods(zoneId: string) {
    await this.prisma.shippingMethod.deleteMany({
      where: { zoneId }
    });
  }

  async removeStates(zoneId: string, stateIds: string[]) {
    await this.prisma.stateZone.deleteMany({
      where: {
        zoneId,
        stateId: { in: stateIds }
      }
    });
  }
}
