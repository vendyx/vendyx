'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { CollectionService } from '@/api/services/collection.service';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const removeCollection = async (id: ID) => {
  await CollectionService.remove([id]);

  const base = getBasePathFormHeaders(headers());

  revalidateTag(CollectionService.Tags.collections);
  redirect(`${base}/collections`);
};
