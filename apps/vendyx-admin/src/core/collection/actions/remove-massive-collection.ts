'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { CollectionService } from '@/api/services/collection.service';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const removeMassiveCollection = async (ids: ID[]) => {
  await CollectionService.remove(ids);

  const base = getBasePathFormHeaders(headers());

  revalidateTag(CollectionService.Tags.collections);
  redirect(`${base}/collections`);
};
