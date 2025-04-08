import { useEffect, useState, useTransition } from 'react';

import { type CommonOrderFragment } from '@/api/types';
import { useEntityContext } from '@/shared/contexts/entity-context';
import { notification } from '@/shared/notifications/notifications';

import { markOrderAsReadyForPickup } from '../../actions/mark-as-ready-for-pickup';

export const useMarkOrderAReadyForPickup = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const { entity: order } = useEntityContext<CommonOrderFragment>();

  useEffect(() => {
    // When is success, the button unmount
    // So we put the notification in the cleanup function validating if operation is successful to show notification
    return () => {
      if (isSuccess) {
        notification.success('Order marked as ready for pickup');
      }
    };
  }, [isSuccess, isLoading]);

  const exec = (cb: () => void) => {
    startTransition(async () => {
      const result = await markOrderAsReadyForPickup(order.id);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
      cb();
    });
  };

  return {
    markOrderAsReadyForPickup: exec,
    isLoading
  };
};
