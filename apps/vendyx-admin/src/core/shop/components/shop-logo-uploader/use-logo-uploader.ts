import { useTransition } from 'react';

import { type CommonShopFragment } from '@/api/types';

import { addLogo } from '../../actions/add-logo';
import { removeLogo } from '../../actions/remove-logo';

export const useLogoUploader = (shop: CommonShopFragment) => {
  const [isUploading, startUploading] = useTransition();
  const [isRemoving, startRemoving] = useTransition();

  const onUpload = (file: File) => {
    startUploading(async () => {
      const newImage = new FormData();
      newImage.append('files', file);

      await addLogo(shop.slug, newImage);
    });
  };

  const onRemove = () => {
    startRemoving(async () => {
      await removeLogo(shop.slug);
    });
  };

  return {
    isUploading,
    onUpload,
    isRemoving,
    onRemove
  };
};
