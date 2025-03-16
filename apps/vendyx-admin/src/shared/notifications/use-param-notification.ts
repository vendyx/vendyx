'use client';

import { useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { wait } from '../utils/theme';
import { type ParamNotifications } from './notification-constants';
import { notification } from './notifications';

/**
 * @description
 * Shows a notification when the query param specified is present.
 */
export const useParamNotification = (param: ParamNotifications, message: string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isParamPresent = searchParams.get(param);

  useEffect(() => {
    void (async () => {
      if (!isParamPresent) return;

      await wait(1);
      notification.success(message);

      const params = new URLSearchParams(searchParams);
      params.delete(param);

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    })();
  }, []);
};
