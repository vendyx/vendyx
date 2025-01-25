'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { CollectionService } from '@/api/services/collection.service';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const removeMassiveCollection = async (ids: ID[]) => {
  const isOk = await CollectionService.remove(ids);

  if (!isOk) {
    return { error: 'Failed to remove products' };
  }

  const base = getBasePathFormHeaders(headers());

  revalidateTag(CollectionService.Tags.collections);
  redirect(`${base}/collections`);
};
