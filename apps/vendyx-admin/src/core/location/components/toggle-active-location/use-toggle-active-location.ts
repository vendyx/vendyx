import { useEffect, useState, useTransition } from 'react';

import { type ID } from '@/api/scalars/scalars.type';
import { notification } from '@/shared/notifications/notifications';

import { updateLocation } from '../../actions/update-location';

export const useToggleActiveLocation = (prevState: boolean) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      // Here location has been updated, so we do not validate in a toggle mode
      notification.success(prevState ? 'Location activated' : 'Location deactivated');
      setIsSuccess(false);
    }
  }, [isSuccess, isLoading]);

  const exec = (locationId: ID) => {
    startTransition(async () => {
      const result = await updateLocation(locationId, { isActive: !prevState });

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
    });
  };

  return {
    toggleActiveLocation: exec,
    isLoading
  };
};
