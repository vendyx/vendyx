import { type FC, useEffect, useState } from 'react';

import { XIcon } from 'lucide-react';

import { type CommonShopFragment } from '@/api/types';
import { Dropzone } from '@/shared/components/dropzone/dropzone';
import { LoaderSpiner } from '@/shared/components/loaders/loader-spiner';
import { cn } from '@/shared/utils/theme';

import { useLogoUploader } from './use-logo-uploader';

export const ShopLogoUploader: FC<Props> = ({ shop }) => {
  const image = shop.logo;
  const { isUploading, onUpload, isRemoving, onRemove } = useLogoUploader(shop);
  const [file, setFile] = useState<File | null>(null);

  // Every time variants change, reset the file
  // This is to avoid a bug where the user adds an image [file: File, image: 'http://...']
  // Then user removes image [file: File, image: null] in this point, file still renders
  // So every time variants change, we reset the file because we use file to show a preview while uploading
  useEffect(() => {
    setFile(null);
  }, [shop]);

  const isLoading = isUploading || isRemoving;

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (image || file) {
    return (
      <div className="relative group w-20 h-20">
        <button
          type="button"
          className="z-10 opacity-0 absolute top-0 right-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 rounded-full bg-muted"
          onClick={() => {
            setFile(null);
            onRemove();
          }}
          disabled={isLoading}
        >
          <XIcon size={12} className="" />
        </button>
        <div className={cn('relative', 'w-20 h-20')}>
          <img
            src={file ? URL.createObjectURL(file) : (image ?? '')}
            alt="Uploaded"
            className={cn('object-cover rounded', isLoading && 'opacity-50', 'w-20 h-20')}
          />
          {isLoading && <LoaderSpiner size={24} className="absolute top-1/3 right-1/3" />}
        </div>
      </div>
    );
  }

  return (
    <Dropzone
      className="w-20 h-20"
      onAcceptFiles={files => {
        const file = files[0];

        setFile(file);
        onUpload(file);
      }}
    />
  );
};

type Props = {
  shop: CommonShopFragment;
};
