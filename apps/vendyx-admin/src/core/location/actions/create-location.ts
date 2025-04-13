'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { LocationService } from '@/api/services/location.service';
import { type CreateLocationInput } from '@/api/types';
import { ParamNotifications } from '@/shared/notifications/notification-constants';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const createLocation = async (input: CreateLocationInput) => {
  const result = await LocationService.create(input);

  if (!result.success) {
    return { error: result.error, errorCode: result.errorCode };
  }

  const basePath = getBasePathFormHeaders(headers());

  revalidateTag(LocationService.Tags.locations);
  redirect(
    `${basePath}/settings/locations/${result.locationId}?${ParamNotifications.EntityCreated}=true`
  );
};
