import { OrderState } from '@prisma/client';

import { OrderListInput } from '@/api/shared/types/gql.types';
import { PrismaForShop } from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

import { parseOrderCode } from './order.utils';
import { clean } from '../shared/utils/clean.utils';

/**
 * Helper class to store methods related to find many orders managing the filters
 */
export class OrderFinders {
  constructor(private readonly _prisma: PrismaForShop) {}

  async find(input?: OrderListInput, customerId?: ID) {
    return this._prisma.order.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        customerId: customerId,
        state: input?.filters?.state
          ? input?.filters?.state
          : { notIn: [OrderState.MODIFYING, OrderState.CANCELED] },
        ...(input?.filters?.customer
          ? {
              OR: [
                {
                  code: input?.filters?.code ? parseOrderCode(input?.filters?.code) : undefined
                },
                {
                  customer: {
                    OR: [
                      {
                        firstName: { ...clean(input?.filters?.customer ?? {}), mode: 'insensitive' }
                      },
                      {
                        lastName: { ...clean(input?.filters?.customer ?? {}), mode: 'insensitive' }
                      }
                    ]
                  }
                }
              ]
            }
          : {
              code: input?.filters?.code ? parseOrderCode(input?.filters?.code) : undefined
            })
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async count(input?: OrderListInput, customerId?: ID) {
    return this._prisma.order.count({
      where: {
        customerId: customerId,
        state: input?.filters?.state
          ? input?.filters?.state
          : { notIn: [OrderState.MODIFYING, OrderState.CANCELED] },
        ...(input?.filters?.customer
          ? {
              OR: [
                {
                  code: input?.filters?.code ? parseOrderCode(input?.filters?.code) : undefined
                },
                {
                  customer: {
                    OR: [
                      {
                        firstName: { ...clean(input?.filters?.customer ?? {}), mode: 'insensitive' }
                      },
                      {
                        lastName: { ...clean(input?.filters?.customer ?? {}), mode: 'insensitive' }
                      }
                    ]
                  }
                }
              ]
            }
          : {
              code: input?.filters?.code ? parseOrderCode(input?.filters?.code) : undefined
            })
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
