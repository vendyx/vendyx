import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog';

import { useLocationContext } from '../../contexts/location-context';
import { LocationAddressForm } from '../location-address-form/location-address-form';
import { useLocationDetailsFormContext } from '../location-details-form/use-location-details-form';
import { LocationSubmitButton } from '../location-submit-button/location-submit-button';
import { LocationAddressCard } from './location-address-card';

export const LocationAddressDialog = () => {
  const { isSuccess, isLoading } = useLocationDetailsFormContext();
  const { location } = useLocationContext();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setIsOpen(false);
    }
  }, [isSuccess, isLoading]);

  if (!location) return null;

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTrigger asChild>
        <LocationAddressCard />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Location address</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
          <LocationAddressForm />
          <DialogFooter>
            <LocationSubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
