'use client';

import { type FC } from 'react';

import { RemoveEntityButton } from '@/shared/components/remove-entity/remove-entity-button';

import { type ProductsTableRow } from '../products-table/product-table';
import { useRemoveMassiveProduct } from './use-remove-massive-product';

export const RemoveMassiveProductsButton: FC<Props> = ({ rows, onFinish }) => {
  const { removeProduct, isLoading } = useRemoveMassiveProduct(onFinish);

  const entitiesId = rows.map(row => row.id);

  return (
    <RemoveEntityButton
      title={`Remove all selected products`}
      description="By removing the products you will also remove all related information, media files, variants and options. This action cannot be undone."
      onRemove={async () => await removeProduct(entitiesId)}
      isLoading={isLoading}
    />
  );
};

type Props = {
  rows: ProductsTableRow[];
  onFinish: () => void;
};
