'use client';

import React, { type FC } from 'react';

import { DataTable } from '@/shared/components/data-table/data-table';

import { RemoveMassiveProductsButton } from '../remove-massive-product/remove-massive-products-button';
import { type ProductsTableRow } from './product-table';
import { ProductTableColumns } from './products-table-columns';

const ProductTableData: FC<Props> = ({ data, pagination, totalRows }) => {
  const { page, search, size } = pagination;

  return (
    <DataTable
      columns={ProductTableColumns}
      data={data}
      defaults={{ page, search, size }}
      totalRows={totalRows}
      actions={(rows, onFinish) => <RemoveMassiveProductsButton rows={rows} onFinish={onFinish} />}
    />
  );
};

type Props = {
  data: ProductsTableRow[];
  pagination: Pagination;
  totalRows: number;
};

type Pagination = {
  size: number;
  page: number;
  search: string;
};

export default ProductTableData;
