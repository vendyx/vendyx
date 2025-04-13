import { LocationErrorCode, type LocationErrorResult } from '../types';

export const getLocationError = (error: LocationErrorResult | undefined) => {
  if (!error) return null;

  if (error.code === LocationErrorCode.LocationNameAlreadyExists) {
    return 'Location name already exists';
  }
};
