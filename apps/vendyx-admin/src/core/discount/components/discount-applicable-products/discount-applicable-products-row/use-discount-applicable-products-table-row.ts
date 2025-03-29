import { useEffect, useState, useTransition } from 'react';

import { type ProductDiscountMetadata } from '@/api/scalars/scalars.type';
import {
  type CommonDiscountApplicableProductFragment,
  type CommonEnhancedProductForSelectorFragment
} from '@/api/types';
import { updateDiscount } from '@/core/discount/actions/update-discount';
import { useDiscountContext } from '@/core/discount/contexts/discount-context';
import { notification } from '@/shared/notifications/notifications';

import {
  type InMemoryProductDiscountMetadata,
  useDiscountDetailsFormContext
} from '../../discount-details-form/use-discount-details-form';

export const useDiscountApplicableProductsTableRow = (
  product: CommonDiscountApplicableProductFragment | CommonEnhancedProductForSelectorFragment
) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { setValue, getValues } = useDiscountDetailsFormContext();
  const { isCreating, discount } = useDiscountContext();

  useEffect(() => {
    if (isSuccess && !isLoading) {
      notification.success('Products removed from discount');
    }
  }, [isSuccess, isLoading]);

  const onRemove = async () => {
    if (isCreating) {
      const metadata = getValues('metadata') as InMemoryProductDiscountMetadata;
      const products = metadata.inMemoryProductsSelected ?? [];

      const newProducts = products.filter(p => p.id !== product.id);

      setValue('metadata', {
        ...metadata,
        inMemoryProductsSelected: newProducts
      } satisfies InMemoryProductDiscountMetadata);
    } else {
      startTransition(async () => {
        const metadata = getValues('metadata') as ProductDiscountMetadata;
        const variantIdsToRemove = product.variants.items.map(v => v.id);

        const newVariants = metadata.variants.filter(v => !variantIdsToRemove.includes(v));
        await updateDiscount(discount?.id ?? '', {
          metadata: {
            variants: newVariants
          }
        });
        setIsSuccess(true);
      });
    }
  };

  return {
    isLoading,
    onRemove
  };
};
