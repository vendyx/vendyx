import { getTagError } from '../errors/tag.errors';
import { CREATE_TAG_MUTATION, GET_ALL_TAGS_QUERY } from '../operations/tag.operations';
import { type ID } from '../scalars/scalars.type';
import { type CreateTagInput, type TagErrorCode, type TagListInput } from '../types';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export class TagService {
  static Tags = {
    tags: 'tags'
  };

  static async getAll(input?: TagListInput) {
    const { tags } = await serviceGqlFetcher(
      GET_ALL_TAGS_QUERY,
      { input },
      { tags: [TagService.Tags.tags] }
    );

    return tags;
  }

  static async create(input: CreateTagInput): Promise<Result> {
    const {
      createTag: { apiErrors, tag }
    } = await serviceGqlFetcher(CREATE_TAG_MUTATION, { input });

    const error = getTagError(apiErrors[0]);

    if (error) {
      return { success: false, errorCode: apiErrors[0].code, error };
    }

    return { success: true, tagId: tag?.id ?? '' };
  }
}

type Result =
  | {
      success: true;
      tagId: ID;
    }
  | {
      success: false;
      error: string;
      errorCode: TagErrorCode;
    };
