import { useTransition } from 'react';

import { notification } from '@/shared/notifications/notifications';

import { removeMassiveCollection } from '../../actions/remove-massive-collection';

export const useRemoveMassiveCollections = (onFinish?: () => void) => {
  const [isLoading, startTransition] = useTransition();

  const exec = async (ids: string[]) => {
    startTransition(async () => {
      const result = await removeMassiveCollection(ids);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      notification.success('Collections removed');
      onFinish?.();
    });
  };

  return {
    isLoading,
    removeMassiveCollection: exec
  };
};
