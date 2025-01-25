'use client';

import { type FC } from 'react';
import { useDropzone } from 'react-dropzone';

import { UploadIcon } from 'lucide-react';

import { cn } from '@/shared/utils/theme';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export const Dropzone: FC<Props> = ({ size, disabled, disabledMessage, onAcceptFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted(files) {
      onAcceptFiles(files);
    }
  });

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button">
            <div className={cn(getDropzoneSize(size), 'opacity-50 flex-shrink-0')}>
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
    <div className={cn(getDropzoneSize(size), 'flex-shrink-0')}>
      <label
        className={cn(
          'rounded-md border border-dashed cursor-pointer flex items-center justify-center w-full h-full',
          !disabled && 'hover:bg-muted/50'
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} type="file" className="hidden" disabled={disabled} />
        <UploadIcon size={size === 'lg' ? 24 : 16} />
      </label>
    </div>
  );
};

type Props = {
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  disabledMessage?: string;
  onAcceptFiles: (files: File[]) => void;
};

export const getDropzoneSize = (size: Props['size']) => {
  if (size === 'sm') return 'w-[48px] h-[48px]';

  if (size === 'md') return 'w-[60px] h-[60px]';

  if (size === 'lg') return 'aspect-w-1 aspect-h-1';
};
