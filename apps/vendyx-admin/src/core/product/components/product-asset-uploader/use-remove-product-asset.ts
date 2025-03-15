import { useTransition } from 'react';

import { type CommonProductFragment } from '@/api/types';

import { removeProductImage } from '../../actions/remove-product-image';

export const useRemoveProductAsset = (product?: CommonProductFragment) => {
  const [isLoading, startTransition] = useTransition();

  const execute = (assetUrl: string) => {
    if (!product?.id) {
      throw new Error('Product ID is required');
    }

    startTransition(async () => {
      const assetToRemove = product.assets.items.find(a => a.source === assetUrl);

      if (!assetToRemove) return;

      await removeProductImage(product.id, product.assets.items, assetToRemove?.id);
    });
  };

  return {
    isLoading,
    removeVariantImage: execute
  };
};
