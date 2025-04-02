import { useEffect, useState, useTransition } from 'react';

import { type ID, type ShippingDiscountMetadata } from '@/api/scalars/scalars.type';
import { updateDiscount } from '@/core/discount/actions/update-discount';
import { useDiscountContext } from '@/core/discount/contexts/discount-context';
import { notification } from '@/shared/notifications/notifications';

import { useDiscountDetailsFormContext } from '../../../discount-details-form/use-discount-details-form';

export const useRemoveDiscountCountry = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const { discount } = useDiscountContext();
  const { getValues } = useDiscountDetailsFormContext();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      notification.success('Discount updated');
      setIsSuccess(false);
    }
  }, [isSuccess, isLoading]);

  const exec = (countryId: ID) => {
    startTransition(async () => {
      if (!discount) return;

      const metadata = getValues('metadata') as ShippingDiscountMetadata;
      const selectedCountries = metadata.countries ?? [];

      const newCountries = selectedCountries.filter(c => c !== countryId);

      const result = await updateDiscount(discount.id, {
        metadata: {
          countries: newCountries,
          allCountries: false
        } satisfies ShippingDiscountMetadata
      });

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    removeCountry: exec
  };
};
