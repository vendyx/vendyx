/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { type FC, useMemo, useState } from 'react';
import { type Accept } from 'react-dropzone';

import { isFirst } from '@/shared/utils/arrays';
import { cn } from '@/shared/utils/theme';

import { Dropzone } from '../dropzone/dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const FileUploader: FC<Props> = ({
  onAcceptFiles,
  defaultPreviews,
  disabledState,
  title = 'Images',
  max,
  accept
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const previews = useMemo(() => {
    const previews = [...(defaultPreviews ?? []), ...files.map(file => URL.createObjectURL(file))];

    return max ? previews.slice(0, max) : previews;
  }, [files, defaultPreviews, max]);

  const _onAcceptFiles = (acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles];

    !disabledState && setFiles(newFiles);
    onAcceptFiles(newFiles);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!previews.length && <Dropzone size="lg" onAcceptFiles={_onAcceptFiles} />}
        {Boolean(previews.length) && (
          <div className="grid grid-cols-3 gap-4">
            {previews.map((file, i) => (
              <div key={file} className={cn('aspect-w-1 aspect-h-1', isFirst(i) && 'col-span-3')}>
                <img
                  key={file}
                  src={file}
                  className="object-cover rounded w-full h-full hover:opacity-60 cursor-pointer"
                />
              </div>
            ))}
            {max ? (
              previews.length < max && <Dropzone size="lg" onAcceptFiles={_onAcceptFiles} />
            ) : (
              <Dropzone size="lg" onAcceptFiles={_onAcceptFiles} accept={accept} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  onAcceptFiles: (files: File[]) => void;
  defaultPreviews?: string[];
  disabledState?: boolean;
  title?: string;
  max?: number;
  accept?: Accept;
};
