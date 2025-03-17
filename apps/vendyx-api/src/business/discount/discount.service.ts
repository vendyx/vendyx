import { Inject, Injectable } from '@nestjs/common';

import { clean } from '../shared/utils/clean.utils';

import {
  CreateDiscountInput,
  DiscountListInput,
  UpdateDiscountInput
} from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

@Injectable()
export class DiscountService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  find(input: DiscountListInput) {
    return this.prisma.discount.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        handle: input?.filters?.handle
          ? { ...clean(input.filters.handle), mode: 'insensitive' }
          : {}
      }
    });
  }

  count(input: DiscountListInput) {
    return this.prisma.discount.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        handle: input?.filters?.handle
          ? { ...clean(input.filters.handle), mode: 'insensitive' }
          : {}
      }
    });
  }

  findById(id: ID) {
    return this.prisma.discount.findUnique({
      where: { id }
    });
  }

  async create(input: CreateDiscountInput) {
    return this.prisma.discount.create({
      data: {
        ...clean(input)
      }
    });
  }

  async update(id: ID, input: UpdateDiscountInput) {
    return this.prisma.discount.update({
      where: { id },
      data: {
        ...clean(input)
      }
    });
  }

  async remove(id: ID[]) {
    return this.prisma.discount.updateMany({
      where: { id: { in: id } },
      data: {
        deletedAt: new Date()
      }
    });
  }
}
