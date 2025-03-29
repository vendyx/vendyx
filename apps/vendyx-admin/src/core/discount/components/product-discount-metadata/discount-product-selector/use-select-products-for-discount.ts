import { useEffect, useState, useTransition } from 'react';

import { type ID, type ProductDiscountMetadata } from '@/api/scalars/scalars.type';
import { updateDiscount } from '@/core/discount/actions/update-discount';
import { useDiscountContext } from '@/core/discount/contexts/discount-context';
import { notification } from '@/shared/notifications/notifications';

export const useSelectProductsForDiscount = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { discount } = useDiscountContext();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      notification.success('Discount updated');
    }
  }, [isSuccess, isLoading]);

  const onSelect = (selectedVariants: ID[], cb: () => void) => {
    startTransition(async () => {
      if (!discount) return;

      const result = await updateDiscount(discount.id, {
        metadata: { variants: selectedVariants } satisfies ProductDiscountMetadata
      });

      if (result?.error) {
        notification.error('Failed to update discount');
        return;
      }

      setIsSuccess(true);
      cb();
    });
  };

  return {
    onSelect,
    isLoading
  };
};
