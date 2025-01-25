import { useEffect, useState, useTransition } from 'react';

import { notification } from '@/shared/notifications/notifications';

import { removeProduct } from '../../actions/remove-product';

export const useRemoveProduct = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // When is success, the button unmounts
    // So we put the notification in the cleanup function validating if operation is successful to show notification
    return () => {
      if (isSuccess) {
        notification.success('Product removed');
      }
    };
  }, [isSuccess, isLoading]);

  const exec = async (id: string[]) => {
    startTransition(async () => {
      const result = await removeProduct(id);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    removeProduct: exec
  };
};
