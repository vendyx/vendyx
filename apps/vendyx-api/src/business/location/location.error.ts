import { LocationErrorCode } from '@/api/shared/types/gql.types';

import { ErrorResult } from '../shared/utils/error-result.utils';

/**
 * Error thrown when a new location is created with a name that already exists.
 */
export class LocationNameAlreadyExists extends ErrorResult<LocationErrorCode> {
  constructor() {
    super(LocationErrorCode.LOCATION_NAME_ALREADY_EXISTS, 'Location name already exists');
  }
}
