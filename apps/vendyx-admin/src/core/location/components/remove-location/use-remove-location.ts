import { useEffect, useState, useTransition } from 'react';

import { type ID } from '@/api/scalars/scalars.type';
import { notification } from '@/shared/notifications/notifications';

import { removeLocation } from '../../actions/remove-location';

export const useRemoveLocation = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        notification.success('Location removed');
        setIsSuccess(false);
      }
    };
  }, [isLoading, isSuccess]);

  const exec = async (id: ID) => {
    startTransition(async () => {
      const result = await removeLocation(id);

      if (result.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    removeLocation: exec
  };
};
