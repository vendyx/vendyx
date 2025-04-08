'use client';

import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';

import { useMarkOrderAReadyForPickup } from './use-mark-as-ready-for-pickup';

export const MarkOrderAsReadyForPickup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, markOrderAsReadyForPickup } = useMarkOrderAReadyForPickup();

  return (
    <AlertDialog onOpenChange={open => setIsOpen(open)} open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button type="button">Mark as ready for pickup</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark as ready for pickup</AlertDialogTitle>
          <AlertDialogDescription>
            Mark this order as ready for pickup and notify the customer with the instructions
            specified in your location settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <MarkOrderAsSHippedForm /> */}
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            onClick={() => markOrderAsReadyForPickup(() => setIsOpen(false))}
            isLoading={isLoading}
          >
            Mark as ready for pickup
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
