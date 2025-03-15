import { useTransition } from 'react';

import { type CommonCollectionFragment } from '@/api/types';

import { removeCollectionImage } from '../../actions/remove-collection-image';

export const useRemoveCollectionAsset = (collection?: CommonCollectionFragment) => {
  const [isLoading, startTransition] = useTransition();

  const execute = (assetUrl: string) => {
    if (!collection?.id) {
      throw new Error('Collection ID is required');
    }

    startTransition(async () => {
      const assetToRemove = collection.assets.items.find(a => a.source === assetUrl);

      if (!assetToRemove) return;

      await removeCollectionImage(collection.id, collection.assets.items, assetToRemove?.id);
    });
  };

  return {
    isLoading,
    removeCollectionImage: execute
  };
};
