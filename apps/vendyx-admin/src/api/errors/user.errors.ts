import { UserErrorCode, type UserErrorResult } from '../codegen/graphql';

export const getUserError = (error?: UserErrorResult) => {
  if (!error) return null;

  if (error.code === UserErrorCode.EmailAlreadyExists) {
    return 'Email already exists';
  }

  if (error.code === UserErrorCode.InvalidCredentials) {
    return 'Invalid credentials';
  }

  if (error.code === UserErrorCode.InvalidEmail) {
    return 'Invalid email';
  }

  if (error.code === UserErrorCode.PasswordInvalidLength) {
    return 'Invalid password length';
  }

  return 'Something went wrong';
};
