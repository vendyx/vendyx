import { TagErrorCode, type TagErrorResult } from '../types';

export const getTagError = (error: TagErrorResult | undefined) => {
  if (!error) return null;

  if (error.code === TagErrorCode.NameAlreadyExists) {
    return 'Tag with this name already exists';
  }
};
