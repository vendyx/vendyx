import { DiscountApplicationMode } from '@prisma/client';

import { DiscountErrorCode } from '@/api/shared/types/gql.types';

import { ErrorResult } from '../shared/utils/error-result.utils';

export class HandleAlreadyExistsError extends ErrorResult<DiscountErrorCode> {
  constructor(applicationMode: DiscountApplicationMode) {
    const msg =
      applicationMode === DiscountApplicationMode.AUTOMATIC
        ? 'There is already a discount with that name'
        : 'There is already a discount with that code';

    super(DiscountErrorCode.HANDLE_ALREADY_EXISTS, msg);
  }
}
