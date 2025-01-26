import { useEffect, useState, useTransition } from 'react';

import { type CommonShopFragment } from '@/api/types';
import { notification } from '@/shared/notifications/notifications';

import { addLogo } from '../../actions/add-logo';
import { removeLogo } from '../../actions/remove-logo';

export const useLogoUploader = (shop: CommonShopFragment) => {
  const [isUploading, startUploading] = useTransition();
  const [isRemoving, startRemoving] = useTransition();

  const [uploadedSuccessfully, setUploadedSuccessfully] = useState(false);
  const [removedSuccessfully, setRemovedSuccessfully] = useState(false);

  useEffect(() => {
    if (!isUploading && uploadedSuccessfully) {
      setUploadedSuccessfully(false);
      notification.success('Logo uploaded successfully');
    }
  });

  useEffect(() => {
    if (!isRemoving && removedSuccessfully) {
      setRemovedSuccessfully(false);
      notification.success('Logo removed successfully');
    }
  });

  const onUpload = (file: File) => {
    startUploading(async () => {
      const newImage = new FormData();
      newImage.append('files', file);

      await addLogo(shop.slug, newImage);
      setUploadedSuccessfully(true);
    });
  };

  const onRemove = () => {
    startRemoving(async () => {
      await removeLogo(shop.slug);
      setRemovedSuccessfully(true);
    });
  };

  return {
    isUploading,
    onUpload,
    isRemoving,
    onRemove
  };
};
