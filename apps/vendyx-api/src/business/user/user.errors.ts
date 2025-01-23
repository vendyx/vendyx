import { ErrorResult } from '../shared/utils/error-result.utils';

import { UserErrorCode } from '@/api/shared/types/gql.types';

export class EmailAlreadyExists extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.EMAIL_ALREADY_EXISTS, 'Email already exists');
  }
}

export class InvalidCredentials extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.INVALID_CREDENTIALS, 'Invalid credentials');
  }
}

export class PasswordInvalidLength extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.PASSWORD_INVALID_LENGTH, 'Password must be at least 8 characters long');
  }
}

export class InvalidEmail extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.INVALID_EMAIL, 'Invalid email');
  }
}
