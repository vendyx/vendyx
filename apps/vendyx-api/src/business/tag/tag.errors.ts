import { ErrorResult } from '../shared/utils/error-result.utils';

import { TagErrorCode } from '@/api/shared/types/gql.types';

export class TagNameAlreadyExists extends ErrorResult<TagErrorCode> {
  constructor(name: string) {
    super(TagErrorCode.NAME_ALREADY_EXISTS, `Tag with name "${name}" already exists`);
  }
}
