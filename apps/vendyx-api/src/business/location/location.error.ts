import { ErrorResult } from '../shared/utils/error-result.utils';

import { LocationErrorCode } from '@/api/shared/types/gql.types';

/**
 * Error thrown when a new location is created with a name that already exists.
 */
export class LocationNameAlreadyExists extends ErrorResult<LocationErrorCode> {
  constructor() {
    super(LocationErrorCode.LOCATION_NAME_ALREADY_EXISTS, 'Location name already exists');
  }
}

/**
 * Error thrown when the location that is tried to be removed is the default location.
 */
export class LocationIsDefault extends ErrorResult<LocationErrorCode> {
  constructor() {
    super(
      LocationErrorCode.LOCATION_IS_DEFAULT,
      'Location is default, set as default another one to remove this one'
    );
  }
}
