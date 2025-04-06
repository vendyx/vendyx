import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTagInput, TagListInput } from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';
import { TagService } from '@/business/tag/tag.service';
import { ID } from '@/persistence/types/scalars.type';

@Resolver('Tag')
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query('tags')
  async tags(@Args('input') input: TagListInput) {
    const [tags, total] = await Promise.all([
      this.tagService.find(input),
      this.tagService.count(input)
    ]);

    return new ListResponse(tags, tags.length, { total });
  }

  @Mutation('createTags')
  async createTag(@Args('input') input: CreateTagInput[]) {
    const result = await this.tagService.create(input);

    return isErrorResult(result)
      ? { apiErrors: [result], tags: [] }
      : { apiErrors: [], tags: result };
  }

  @Mutation('updateTag')
  async updateTag(@Args('id') id: string, @Args('input') input: CreateTagInput) {
    const result = await this.tagService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], tag: result };
  }

  @Mutation('removeTags')
  async removeTag(@Args('ids') ids: ID[]) {
    return await this.tagService.remove(ids);
  }
}
