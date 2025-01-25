'use client';

import { type FC } from 'react';

import { RemoveEntityButton } from '@/shared/components/remove-entity/remove-entity-button';

import { useRemoveProduct } from './use-remove-product';

export const RemoveMassiveProductsButton: FC<Props> = ({ productsId }) => {
  const { removeProduct, isLoading } = useRemoveProduct();

  return (
    <RemoveEntityButton
      title={`Remove all selected products`}
      description="By removing the products you will also remove all related information, media files, variants and options. This action cannot be undone."
      onRemove={async () => await removeProduct(productsId)}
      isLoading={isLoading}
    />
  );
};
type Props = {
  productsId: string[];
};
