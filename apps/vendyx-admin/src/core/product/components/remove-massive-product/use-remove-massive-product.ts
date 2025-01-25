import { useTransition } from 'react';

import { notification } from '@/shared/notifications/notifications';

import { removeMassiveProducts } from '../../actions/remove-massive-products';

export const useRemoveMassiveProduct = (onFinish?: () => void) => {
  const [isLoading, startTransition] = useTransition();

  const exec = async (ids: string[]) => {
    startTransition(async () => {
      const result = await removeMassiveProducts(ids);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      notification.success('Products removed');
      onFinish?.();
    });
  };

  return {
    isLoading,
    removeProduct: exec
  };
};
