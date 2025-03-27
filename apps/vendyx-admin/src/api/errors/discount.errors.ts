import { DiscountErrorCode, type DiscountErrorResult } from '../types';

export const getDiscountError = (error?: DiscountErrorResult) => {
  if (!error?.code) return null;

  if (error.code === DiscountErrorCode.HandleAlreadyExists) {
    return 'Discount handle already exists';
  }
};
