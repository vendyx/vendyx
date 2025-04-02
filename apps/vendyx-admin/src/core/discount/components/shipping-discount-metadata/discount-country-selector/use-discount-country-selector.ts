import { useEffect, useState, useTransition } from 'react';

import { type ShippingDiscountMetadata } from '@/api/scalars/scalars.type';
import { updateDiscount } from '@/core/discount/actions/update-discount';
import { useDiscountContext } from '@/core/discount/contexts/discount-context';
import { notification } from '@/shared/notifications/notifications';

export const useDiscountCountrySelector = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const { discount } = useDiscountContext();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      notification.success('Discount updated');
      setIsSuccess(false);
    }
  }, [isSuccess, isLoading]);

  const onSelect = (selectedCountries: string[], cb: () => void) => {
    startTransition(async () => {
      if (!discount) return;

      const result = await updateDiscount(discount.id, {
        metadata: {
          countries: selectedCountries,
          allCountries: false
        } satisfies ShippingDiscountMetadata
      });

      if (result?.error) {
        notification.error(result.error);
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
