'use client';

import NextTopLoader from 'nextjs-toploader';

import { useIsBlocked } from '../hooks/use-navigation-block';

export const TopProgressBar = () => {
  const isBlock = useIsBlocked();

  return !isBlock ? <NextTopLoader color="hsl(var(--primary))" /> : null;
};
