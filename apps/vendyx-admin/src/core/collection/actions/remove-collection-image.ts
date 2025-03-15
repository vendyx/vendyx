'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { CollectionService } from '@/api/services/collection.service';

export const removeCollectionImage = async (
  collectionId: ID,
  prevAssets: { id: string }[],
  assetId: ID
) => {
  const newAssets = prevAssets
    .filter(asset => asset.id !== assetId)
    .map(asset => ({ id: asset.id }));

  const collection = await CollectionService.update(collectionId, {
    assets: newAssets
  });

  revalidateTag(CollectionService.Tags.collection(collection.id));
};
