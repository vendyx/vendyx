'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { LocationService } from '@/api/services/location.service';
import { type UpdateInStorePickupPreferencesInput } from '@/api/types';

export const updateInStorePickupPreferences = async (
  locationId: ID,
  input: UpdateInStorePickupPreferencesInput
) => {
  const result = await LocationService.updateInStorePickupPreferences(locationId, input);

  if (!result.success) {
    return { error: result.error, errorCode: result.errorCode };
  }

  revalidateTag(LocationService.Tags.inStorePickup(locationId));
};
