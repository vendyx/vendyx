import { useTransition } from 'react';

import { type CommonProductFragment } from '@/api/types';

import { addProductImage } from '../../actions/add-product-image';

export const useProductAssetUploader = () => {
  const [isLoading, startTransition] = useTransition();

  const execute = (product: CommonProductFragment, file: File) => {
    startTransition(async () => {
      const newImage = new FormData();
      newImage.append('files', file);

      await addProductImage(product.id, product.assets.items, newImage);
    });
  };

  return {
    isLoading,
    addProductImage: execute
  };
};
