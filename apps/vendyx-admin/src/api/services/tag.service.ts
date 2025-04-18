import { getTagError } from '../errors/tag.errors';
import {
  COMMON_TAG_FRAGMENT,
  CREATE_TAG_MUTATION,
  GET_ALL_TAGS_QUERY
} from '../operations/tag.operations';
import { type ID } from '../scalars/scalars.type';
import {
  type CreateTagInput,
  getFragmentData,
  type TagErrorCode,
  type TagListInput
} from '../types';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export class TagService {
  static Tags = {
    tags: 'tags'
  };

  static async getAll(input?: TagListInput) {
    const result = await serviceGqlFetcher(
      GET_ALL_TAGS_QUERY,
      { input },
      { tags: [TagService.Tags.tags] }
    );

    const tags = result.tags.items.map(t => getFragmentData(COMMON_TAG_FRAGMENT, t));

    return tags;
  }

  static async create(input: CreateTagInput[]): Promise<Result> {
    const {
      createTags: { apiErrors, tags }
    } = await serviceGqlFetcher(CREATE_TAG_MUTATION, { input });

    const error = getTagError(apiErrors[0]);

    if (error) {
      return { success: false, errorCode: apiErrors[0].code, error };
    }

    return { success: true, tags: tags.map(t => t.id) };
  }
}

type Result =
  | {
      success: true;
      tags: ID[];
    }
  | {
      success: false;
      error: string;
      errorCode: TagErrorCode;
    };
