'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { notification } from '../notifications/notifications';

/**
 * @description
 * When an item is created the system reditect,
 * This hook will catch the query param new
 * Triggering a notification.
 */
const useNewNotification = (message: string) => {
  const searchParams = useSearchParams();
  const isNew = searchParams.get('new');

  useEffect(() => {
    if (!isNew) return;

    notification.success(message);
  }, []);
};

export default useNewNotification;
