'use client';

import { type FC } from 'react';
import { type Accept, useDropzone } from 'react-dropzone';

import { UploadIcon } from 'lucide-react';

import { cn } from '@/shared/utils/theme';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const ACCEPT_FILES = {
  'image/jpeg': [],
  'image/png': []
};

export const Dropzone: FC<Props> = ({
  size,
  disabled,
  disabledMessage,
  onAcceptFiles,
  className,
  accept
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted(files) {
      onAcceptFiles(files);
    },
    accept: accept ?? ACCEPT_FILES
  });

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button">
            <div className={cn(className, getDropzoneSize(size), 'opacity-50 flex-shrink-0')}>
              <div
                className={cn(
                  'rounded-md border border-dashed flex items-center justify-center w-full h-full cursor-not-allowed'
                )}
              >
                <UploadIcon size={size === 'lg' ? 24 : 16} />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{disabledMessage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={cn(className, getDropzoneSize(size), 'flex-shrink-0')}>
      <div
        className={cn(
          'rounded-md border border-dashed cursor-pointer flex items-center justify-center w-full h-full',
          !disabled && 'hover:bg-muted/50'
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} type="file" className="hidden" disabled={disabled} />
        <UploadIcon size={size === 'lg' ? 24 : 16} />
      </div>
    </div>
  );
};

type Props = {
  size?: 'sm' | 'md' | 'lg';
  onAcceptFiles: (files: File[]) => void;
  disabled?: boolean;
  disabledMessage?: string;
  className?: string;
  accept?: Accept;
};

export const getDropzoneSize = (size?: Props['size']) => {
  if (size === 'sm') return 'w-[48px] h-[48px]';

  if (size === 'md') return 'w-[60px] h-[60px]';

  if (size === 'lg') return 'aspect-w-1 aspect-h-1';

  return '';
};
