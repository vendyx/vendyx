import { useTransition } from 'react';

import { notification } from '@/shared/notifications/notifications';

import { removeProduct } from '../../actions/remove-product';

export const useRemoveMassiveProduct = (onFinish?: () => void) => {
  const [isLoading, startTransition] = useTransition();

  const exec = async (ids: string[]) => {
    startTransition(async () => {
      const result = await removeProduct(ids);

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
