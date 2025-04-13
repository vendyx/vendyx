'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { LocationService } from '@/api/services/location.service';
import { type UpdateLocationInput } from '@/api/types';

export const updateLocation = async (id: ID, input: UpdateLocationInput) => {
  const result = await LocationService.update(id, input);

  if (!result.success) {
    return { error: result.error, errorCode: result.errorCode };
  }

  revalidateTag(LocationService.Tags.locations);
  revalidateTag(LocationService.Tags.location(id));
};
