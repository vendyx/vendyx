import { Inject, Injectable } from '@nestjs/common';
import { DiscountValueType } from '@prisma/client';

import {
  CreateDiscountInput,
  DiscountListInput,
  OrderRequirementType,
  UpdateDiscountInput
} from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

import { HandleAlreadyExistsError } from './discount.errors';
import { clean } from '../shared/utils/clean.utils';
import { convertToCent } from '../shared/utils/price.utils';

@Injectable()
export class DiscountService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  find(input?: DiscountListInput) {
    return this.prisma.discount.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        ...clean(input?.filters ?? {}),
        handle: input?.filters?.handle
          ? { ...clean(input.filters.handle), mode: 'insensitive' }
          : {}
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  count(input?: DiscountListInput) {
    return this.prisma.discount.count({
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
    const withTheSameHandle = await this.prisma.discount.findFirst({
      where: {
        handle: input.handle
      }
    });

    if (withTheSameHandle) {
      return new HandleAlreadyExistsError(input.applicationMode);
    }

    const discountValue =
      input.discountValueType === DiscountValueType.FIXED_AMOUNT
        ? convertToCent(input.discountValue)
        : input.discountValue;

    const orderRequirementValue =
      input.orderRequirementType === OrderRequirementType.MINIMUM_AMOUNT
        ? convertToCent(input.orderRequirementValue ?? 0)
        : input.orderRequirementValue;

    return this.prisma.discount.create({
      data: {
        ...clean(input),
        discountValue,
        orderRequirementValue
      }
    });
  }

  async update(id: ID, input: UpdateDiscountInput) {
    const discount = await this.prisma.discount.findUniqueOrThrow({ where: { id } });

    if (input.handle) {
      const withTheSameHandle = await this.prisma.discount.findFirst({
        where: {
          handle: input.handle
        }
      });

      if (withTheSameHandle && withTheSameHandle.id !== id) {
        return new HandleAlreadyExistsError(withTheSameHandle.applicationMode);
      }
    }

    const discountValue =
      input.discountValueType === DiscountValueType.FIXED_AMOUNT
        ? convertToCent(input.discountValue ?? discount.discountValue)
        : input.discountValue ?? undefined;

    const orderRequirementValue =
      input.orderRequirementType === OrderRequirementType.MINIMUM_AMOUNT
        ? convertToCent(input.orderRequirementValue ?? discount.orderRequirementValue ?? 0)
        : input.orderRequirementValue ?? undefined;

    return this.prisma.discount.update({
      where: { id },
      data: {
        ...clean(input),
        perCustomerLimit: input.perCustomerLimit,
        orderRequirementType: input.orderRequirementType,
        orderRequirementValue: input.orderRequirementType !== null ? orderRequirementValue : null,
        discountValue
      }
    });
  }

  async remove(ids: ID[]) {
    return this.prisma.discount.updateMany({
      where: { id: { in: ids } },
      data: {
        deletedAt: new Date()
      }
    });
  }
}
