import { ErrorResult } from '../shared/utils/error-result.utils';

import { FavoriteErrorCode } from '@/api/shared/types/gql.types';

export class AlreadyInFavorites extends ErrorResult<FavoriteErrorCode> {
  constructor() {
    super(FavoriteErrorCode.ALREADY_IN_FAVORITES, 'Already in favorites');
  }
}
