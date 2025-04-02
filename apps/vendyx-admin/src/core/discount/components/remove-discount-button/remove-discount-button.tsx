import { type FC } from 'react';

import { type CommonDiscountFragment } from '@/api/types';
import { RemoveEntityButton } from '@/shared/components/remove-entity/remove-entity-button';

import { useRemoveDiscount } from './use-remove-discount';

export const RemoveDiscountButton: FC<Props> = ({ discount }) => {
  const { isLoading, removeDiscount } = useRemoveDiscount();

  return (
    <RemoveEntityButton
      title={`Remove discount "${discount.handle}"`}
      description="By removing this discount, you will no longer be able to use them in your store. This action cannot be undone."
      onRemove={() => removeDiscount(discount.id)}
      isLoading={isLoading}
    />
  );
};

type Props = {
  discount: CommonDiscountFragment;
};
