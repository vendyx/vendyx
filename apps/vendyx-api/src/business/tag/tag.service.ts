import { Inject, Injectable } from '@nestjs/common';

import { TagNameAlreadyExists } from './tag.errors';
import { clean } from '../shared/utils/clean.utils';

import { CreateTagInput, TagListInput, UpdateTagInput } from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

@Injectable()
export class TagService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async find(input?: TagListInput) {
    return this.prisma.tag.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {}
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async count(input?: TagListInput) {
    return this.prisma.tag.count({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        name: input?.filters?.name ? { ...clean(input.filters.name), mode: 'insensitive' } : {}
      }
    });
  }

  async create(input: CreateTagInput) {
    const withTheSameName = await this.prisma.tag.findUnique({ where: { name: input.name } });

    if (withTheSameName) {
      return new TagNameAlreadyExists(input.name);
    }

    return await this.prisma.tag.create({
      data: {
        name: input.name
      }
    });
  }

  async update(id: ID, input: UpdateTagInput) {
    if (input.name) {
      const withTheSameName = await this.prisma.tag.findUnique({ where: { name: input.name } });

      if (withTheSameName && withTheSameName.id !== id) {
        return new TagNameAlreadyExists(input.name);
      }
    }

    return await this.prisma.tag.update({
      where: { id },
      data: {
        ...clean(input)
      }
    });
  }

  async remove(id: ID[]) {
    await this.prisma.productTag.deleteMany({
      where: {
        tagId: { in: id }
      }
    });

    await this.prisma.tag.deleteMany({
      where: {
        id: { in: id }
      }
    });

    return true;
  }
}
