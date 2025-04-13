'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { LocationService } from '@/api/services/location.service';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const removeLocation = async (id: ID) => {
  const result = await LocationService.remove(id);

  if (!result.success) {
    return { error: result.error, errorCode: result.errorCode };
  }

  const basePath = getBasePathFormHeaders(headers());

  revalidateTag(LocationService.Tags.locations);
  redirect(`${basePath}/settings/locations`);
};
