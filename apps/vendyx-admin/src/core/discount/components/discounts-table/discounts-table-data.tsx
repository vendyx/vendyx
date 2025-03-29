'use client';

import { type FC } from 'react';

import { DataTable } from '@/shared/components/data-table/data-table';

import { RemoveMassiveDiscounts } from '../remove-massive-discounts/remove-massive-discounts';
import { type DiscountsTableRow } from './discounts-table';
import { DiscountsTableColumns } from './discounts-table-columns';

export const DiscountsTableData: FC<Props> = ({ data, defaults, totalRows }) => {
  return (
    <DataTable
      columns={DiscountsTableColumns}
      data={data}
      defaults={defaults}
      totalRows={totalRows}
      actions={(rows, onFinish) => <RemoveMassiveDiscounts rows={rows} onFinish={onFinish} />}
    />
  );
};

type Props = {
  data: DiscountsTableRow[];
  defaults: {
    page: number;
    search: string;
    size: number;
  };
  totalRows: number;
};
