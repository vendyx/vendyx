import { type FC, type MutableRefObject, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonProductFragment } from '@/api/types';
import { FileUploader } from '@/shared/components/file-uploader/file-uploader';
import { notification } from '@/shared/notifications/notifications';

import { type ProductDetailsFormInput } from '../product-details/use-product-details-form';
import { useProductAssetUploader } from './use-product-asset-uploader';
import { useRemoveProductAsset } from './use-remove-product-asset';

export const ProductAssetUploader: FC<Props> = ({ product }) => {
  const { setValue, getValues } = useFormContext<ProductDetailsFormInput>();
  const { isLoading, addProductImage } = useProductAssetUploader();
  const { isLoading: isRemoving, removeVariantImage } = useRemoveProductAsset(product);
  const notificationRef: MutableRefObject<string | number | null> = useRef(null);
  const removingNotificationRef: MutableRefObject<string | number | null> = useRef(null);

  useEffect(() => {
    if (isLoading) {
      notificationRef.current = notification.loading('Uploading image...');
    }

    if (!isLoading && notificationRef.current) {
      notification.dismiss(notificationRef.current);
      notification.success('Image uploaded');
    }
  }, [isLoading]);

  useEffect(() => {
    if (isRemoving) {
      removingNotificationRef.current = notification.loading('Removing image...');
    }

    if (!isRemoving && removingNotificationRef.current) {
      notification.dismiss(removingNotificationRef.current);
      notification.success('Image removed');
    }
  }, [isRemoving]);

  return (
    <FileUploader
      onRemoveFile={file => {
        if (file instanceof File) {
          const newImages = (getValues('images') ?? []).filter(image => image !== file);
          setValue('images', newImages);
          return;
        }

        if (product) {
          removeVariantImage(file);
        }
      }}
      onAcceptFiles={files => {
        if (!product) {
          setValue('images', files);
          return;
        }

        addProductImage(product, files[0]);
      }}
      defaultPreviews={product?.assets.items.map(asset => asset.source)}
      disabledState={Boolean(product)}
    />
  );
};

type Props = {
  product?: CommonProductFragment;
};
