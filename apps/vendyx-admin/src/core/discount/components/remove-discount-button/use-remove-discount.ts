import { useTransition } from 'react';

import { type ID } from '@/api/scalars/scalars.type';

import { removeDiscounts } from '../../actions/remove-discounts';

export const useRemoveDiscount = () => {
  const [isLoading, startTransition] = useTransition();

  const exec = (id: ID) => {
    startTransition(async () => {
      await removeDiscounts([id]);
    });
  };

  return {
    isLoading,
    removeDiscount: exec
  };
};
