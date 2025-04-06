import { TagErrorCode } from '@/api/shared/types/gql.types';

import { ErrorResult } from '../shared/utils/error-result.utils';

export class TagNameAlreadyExists extends ErrorResult<TagErrorCode> {
  constructor(names: string[]) {
    super(
      TagErrorCode.NAME_ALREADY_EXISTS,
      `Tags with names ${names.map(n => `"${n}"`).join(',')} already exists`
    );
  }
}
