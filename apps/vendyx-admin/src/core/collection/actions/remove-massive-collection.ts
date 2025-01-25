'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { CollectionService } from '@/api/services/collection.service';

export const removeMassiveCollection = async (ids: ID[]) => {
  const isOk = await CollectionService.remove(ids);

  if (!isOk) {
    return { error: 'Failed to remove products' };
  }

  revalidateTag(CollectionService.Tags.collections);
};
