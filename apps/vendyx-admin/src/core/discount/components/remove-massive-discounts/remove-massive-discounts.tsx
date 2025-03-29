import { type FC } from 'react';

import { RemoveEntityButton } from '@/shared/components/remove-entity/remove-entity-button';

import { type DiscountsTableRow } from '../discounts-table';
import { useRemoveMassiveDiscounts } from './use-remove-massive-discounts';

export const RemoveMassiveDiscounts: FC<Props> = ({ rows, onFinish }) => {
  const { isLoading, onRemove } = useRemoveMassiveDiscounts(onFinish);

  return (
    <RemoveEntityButton
      title={`Remove all selected discounts`}
      description="By removing these discounts, you will no longer be able to use them in your store. This action cannot be undone."
      onRemove={async () => onRemove(rows.map(row => row.id))}
      isLoading={isLoading}
    />
  );
};

type Props = {
  rows: DiscountsTableRow[];
  onFinish: () => void;
};
