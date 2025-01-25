'use client';

import React, { type FC } from 'react';

import { DataTable } from '@/shared/components/data-table/data-table';

import { RemoveMassiveCollectionButton } from '../remove-massive-collection/remove-collection-button';
import { type CollectionsTableRow } from './collections-table';
import { CollectionsTableColumns } from './collections-table-columns';

const CollectionTableData: FC<Props> = ({ data, pagination, totalRows }) => {
  const { page, search, size } = pagination;

  return (
    <DataTable
      columns={CollectionsTableColumns}
      data={data}
      defaults={{ page, search, size }}
      totalRows={totalRows}
      actions={(rows, onFinish) => (
        <RemoveMassiveCollectionButton rows={rows} onFinish={onFinish} />
      )}
    />
  );
};

type Props = {
  data: CollectionsTableRow[];
  pagination: Pagination;
  totalRows: number;
};

type Pagination = {
  size: number;
  page: number;
  search: string;
};

export default CollectionTableData;
