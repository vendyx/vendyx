import { useEffect, useState, useTransition } from 'react';

import { type ID } from '@/api/scalars/scalars.type';
import { notification } from '@/shared/notifications/notifications';

import { removeDiscounts } from '../../actions/remove-discounts';

export const useRemoveMassiveDiscounts = (onFinish: () => void) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      notification.success('Discounts removed');
      setIsSuccess(false);
      onFinish();
    }
  }, [isSuccess, isLoading]);

  const onRemove = (ids: ID[]) => {
    startTransition(async () => {
      await removeDiscounts(ids);

      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    onRemove
  };
};
