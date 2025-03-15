'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { CollectionService } from '@/api/services/collection.service';

export const addSubCollections = async (collectionId: ID, subCollections: ID[]) => {
  const collection = await CollectionService.update(collectionId, {
    subCollections
  });

  revalidateTag(CollectionService.Tags.collectionSubCollections(collection.id));
};
