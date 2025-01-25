import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import {
  CreateCollectionInput,
  ListInput,
  UpdateCollectionInput
} from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CollectionService } from '@/business/collection/collection.service';
import { ID } from '@/persistence/types/scalars.type';

@UseGuards(UserJwtAuthGuard)
@Resolver('Collection')
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Query('collections')
  async collections(@Args('input') input?: ListInput) {
    const [collections, total] = await Promise.all([
      await this.collectionService.find(input),
      await this.collectionService.count(input)
    ]);

    return new ListResponse(collections, collections.length, { total });
  }

  @Query('collection')
  async collection(@Args('id') id: ID, @Args('slug') slug: string) {
    return this.collectionService.findUnique(id, slug);
  }

  @Mutation('createCollection')
  async createCollection(@Args('input') input: CreateCollectionInput) {
    return this.collectionService.create(input);
  }

  @Mutation('updateCollection')
  async updateCollection(@Args('id') id: ID, @Args('input') input: UpdateCollectionInput) {
    return this.collectionService.update(id, input);
  }

  @Mutation('removeCollection')
  async removeCollection(@Args('ids') ids: ID[]) {
    return this.collectionService.remove(ids);
  }
}
