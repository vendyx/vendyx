import { useEffect, useState, useTransition } from 'react';

import { type ID } from '@/api/scalars/scalars.type';
import { notification } from '@/shared/notifications/notifications';

import { removeMassiveCollection } from '../../actions/remove-massive-collection';

export const useRemoveMassiveCollection = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // When is success, the button unmounts
    // So we put the notification in the cleanup function validating if operation is successful to show notification
    return () => {
      if (isSuccess) {
        notification.success('Collection removed');
      }
    };
  }, [isSuccess, isLoading]);

  const exec = async (ids: ID[]) => {
    startTransition(async () => {
      await removeMassiveCollection(ids);
      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    removeMassiveCollection: exec
  };
};
