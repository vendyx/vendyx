import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ListInput } from '@/api/shared/types/gql.types';
import { clean } from '@/business/shared/utils/clean.utils';

import { PRISMA_FOR_ADMIN, PrismaForAdmin } from '../prisma-clients/prisma-for-admin.provider';
import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';

@Injectable()
export class ShopRepository {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin
  ) {}

  async findMany(input?: ListInput) {
    return this.prisma.shop.findMany({ ...clean(input ?? {}), orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string) {
    return this.prisma.shop.findUnique({ where: { id } });
  }

  async count(input?: ListInput) {
    return this.prisma.shop.count();
  }

  async findBySlug(slug: string) {
    return this.prisma.shop.findUnique({ where: { slug } });
  }

  async getTotalByName(name: string) {
    return this.prismaForAdmin.shop.count({ where: { name } });
  }

  async insert(input: Prisma.ShopCreateInput) {
    return this.prisma.shop.create({ data: input });
  }

  async update(slug: string, input: Prisma.ShopUpdateInput) {
    return this.prisma.shop.update({ where: { slug }, data: input });
  }
}
