import { Inject, Injectable } from '@nestjs/common';
import { Product, Variant } from '@prisma/client';

import { AddToFavoritesInput, ProductListInput } from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

import { AlreadyInFavorites } from './favorite.errors';
import { clean } from '../shared/utils/clean.utils';

@Injectable()
export class FavoriteService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async find(customerId: ID, input: ProductListInput): Promise<Variant[]> {
    const result = await this.prisma.favorite.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        customerId,
        variant: {
          product: {
            name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {}
          }
        }
      },
      select: { variant: true }
    });

    return result.map(f => f.variant);
  }

  async count(customerId: ID, input: ProductListInput): Promise<number> {
    const result = await this.prisma.favorite.count({
      where: {
        customerId,
        variant: {
          product: {
            name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {}
          }
        }
      }
    });

    return result;
  }

  async add(customerId: ID, input: AddToFavoritesInput): Promise<AlreadyInFavorites | Variant> {
    const alreadyInFavorites = await this.prisma.favorite.findUnique({
      where: { customerId_variantId: { customerId, variantId: input.variantId } }
    });

    if (alreadyInFavorites) {
      return new AlreadyInFavorites();
    }

    const result = await this.prisma.favorite.create({
      data: { customerId, variantId: input.variantId },
      select: { variant: true }
    });

    return result.variant;
  }

  async remove(customerId: ID, variantIds: ID[]) {
    await this.prisma.favorite.deleteMany({
      where: { customerId, variantId: { in: variantIds } }
    });

    return true;
  }
}
