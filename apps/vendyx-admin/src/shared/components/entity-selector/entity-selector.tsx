'use client';

import { type ReactElement, useState } from 'react';

import { PlusIcon } from 'lucide-react';

import { cn } from '@/shared/utils/theme';

import { LoaderSpiner } from '../loaders/loader-spiner';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Input } from '../ui/input';

/**
 * Displays a dialog with a list of items to select from.
 * Supports custom rendering of items, search, and a done button.
 */
export const EntitySelector = <T,>({
  title,
  triggerText,
  items,
  renderItem,
  onDone,
  onSearch,
  isFetching,
  isDoneAPromise,
  description,
  disabled,
  searchPlaceholder = 'Search...'
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-distinct" variant="link" type="button" disabled={disabled}>
          <PlusIcon size={16} />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader className="px-6 pb-0">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="px-6">
            <Input placeholder={searchPlaceholder} onChange={e => onSearch(e.target.value)} />
          </div>
          <div>
            <div
              className={cn('border-y h-[calc(80px*2)] lg:h-[calc(80px*5)]', 'overflow-y-scroll')}
            >
              {isFetching ? (
                <div className="h-[57px] flex items-center justify-center">
                  <LoaderSpiner />
                </div>
              ) : (
                items.map(item => renderItem(item))
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 gap-2 ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          {isDoneAPromise ? (
            <Button
              onClick={async () => {
                setIsLoading(true);
                await onDone(close);
                setIsLoading(false);
              }}
              isLoading={isLoading}
            >
              Done
            </Button>
          ) : (
            <DialogClose asChild>
              <Button onClick={async () => await onDone(close)}>Done</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type Props<T> = {
  title: string;
  triggerText: string;
  onDone: (close: () => void) => Promise<void> | void;
  items: T[];
  isFetching: boolean;
  renderItem: (item: T) => ReactElement;
  onSearch: (query: string) => void;
  /**
   * If true, the dialog will not close when the done button is clicked. It will show a loading spinner instead.
   * And then you can call close() manually.
   */
  isDoneAPromise?: boolean;
  disabled?: boolean;
  description?: string;
  searchPlaceholder?: string;
};
