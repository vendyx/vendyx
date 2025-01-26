'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

/**
 * @description
 * When the form is dirty
 * this hook will trigger a confirmation to leave the window.
 */
const useWarningDirtyForm = (isDirty: boolean) => {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const originalPush = router.push;

    router.push = (...args) => {
      const confirmLeave = confirm('You have unsaved changes. Are you sure you want to leave?');

      if (confirmLeave) {
        originalPush(...args);
      }
    };

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.push = originalPush;
    };
  }, [isDirty, router]);
};

export default useWarningDirtyForm;
