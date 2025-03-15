/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { type FC, useState } from 'react';
import { type Accept } from 'react-dropzone';

import { XIcon } from 'lucide-react';

import { isFirst } from '@/shared/utils/arrays';
import { cn } from '@/shared/utils/theme';

import { Dropzone } from '../dropzone/dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const FileUploader: FC<Props> = ({
  onAcceptFiles,
  onRemoveFile,
  defaultPreviews,
  disabledState,
  title = 'Images',
  max,
  accept
}) => {
  const [files, setFiles] = useState<FileState[]>([]);

  const _onAcceptFiles = (acceptedFiles: File[]) => {
    const newFiles = [...files.map(f => f.file), ...acceptedFiles];
    const withPreviews = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    !disabledState && setFiles([...files, ...withPreviews]);
    onAcceptFiles(newFiles);
  };

  const _onRemoveFile = (file: FileState | string) => {
    if (typeof file === 'string') {
      onRemoveFile(file);
      return;
    }

    const newFiles = files.filter(f => f.preview !== file.preview);

    setFiles(newFiles);
    onRemoveFile(file.file);
  };

  const nothingToRender = !defaultPreviews?.length && !files.length;
  const images = [...(defaultPreviews ?? []), ...files];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {nothingToRender && <Dropzone size="lg" onAcceptFiles={_onAcceptFiles} />}
        {Boolean(images) && (
          <div className="grid grid-cols-3 gap-4">
            {images.map((file, i) => (
              <div
                key={typeof file === 'string' ? file : file.preview}
                className={cn('relative group', isFirst(i) && 'col-span-3')}
              >
                <button
                  type="button"
                  className="z-10 opacity-0 absolute top-0 right-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 rounded-full bg-muted"
                  onClick={() => _onRemoveFile(file)}
                  // disabled={isLoading}
                >
                  <XIcon size={12} className="" />
                </button>
                <div className={cn('aspect-w-1 aspect-h-1')}>
                  <img
                    src={typeof file === 'string' ? file : file.preview}
                    className="object-cover rounded-lg w-full h-full hover:opacity-60 cursor-pointer"
                  />
                </div>
              </div>
            ))}
            {max ? (
              files.length < max && <Dropzone size="lg" onAcceptFiles={_onAcceptFiles} />
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
  onRemoveFile: (
    /**
     * If file is a string, it means it's a http link
     * If file is a File, it means it's a file in memory and is being used it in creating
     */
    file: File | string
  ) => void;
  defaultPreviews?: string[];
  disabledState?: boolean;
  title?: string;
  max?: number;
  accept?: Accept;
};

type FileState = { file: File; preview: string };
