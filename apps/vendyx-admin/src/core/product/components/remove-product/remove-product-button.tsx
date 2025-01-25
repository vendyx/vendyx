'use client';

import { type FC } from 'react';

import { type CommonProductFragment } from '@/api/types';
import { RemoveEntityButton } from '@/shared/components/remove-entity/remove-entity-button';

import { useRemoveProduct } from './use-remove-product';

export const RemoveProductButton: FC<Props> = ({ product }) => {
  const { removeProduct, isLoading } = useRemoveProduct();

  return (
    <RemoveEntityButton
      title={`Remove product "${product.name}"`}
      description="By removing this product you will also remove all related information, media files, variants and options. This action cannot be undone."
      onRemove={async () => await removeProduct([product.id])}
      isLoading={isLoading}
    />
  );
};
type Props = {
  product: CommonProductFragment;
};
