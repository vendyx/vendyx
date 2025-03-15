import { type FC, type MutableRefObject, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonCollectionFragment } from '@/api/types';
import { FileUploader } from '@/shared/components/file-uploader/file-uploader';
import { notification } from '@/shared/notifications/notifications';

import { type CollectionDetailsFormInput } from '../collection-details/use-collection-details-form';
import { useCollectionAssetUploader } from './use-collection-asset-uploader';
import { useRemoveCollectionAsset } from './use-remove-collection-asset';

export const CollectionAssetUploader: FC<Props> = ({ collection }) => {
  const { setValue } = useFormContext<CollectionDetailsFormInput>();
  const { isLoading: isRemoving, removeCollectionImage } = useRemoveCollectionAsset(collection);
  const { isLoading, addCollectionImage } = useCollectionAssetUploader();
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
      title="Image"
      onRemoveFile={file => {
        if (file instanceof File) {
          setValue('image', undefined);
          return;
        }

        if (collection) {
          removeCollectionImage(file);
        }
      }}
      onAcceptFiles={files => {
        if (!collection) {
          setValue('image', files[0]);
          return;
        }

        addCollectionImage(collection, files[0]);
      }}
      defaultPreviews={collection?.assets.items.length ? [collection.assets.items[0]?.source] : []}
      disabledState={Boolean(collection)}
      max={1}
    />
  );
};

type Props = {
  collection?: CommonCollectionFragment;
};
