import { type FC } from 'react';

import { DiscountService } from '@/api/services/discount.service';
import {
  type DiscountApplicationMode,
  type DiscountType,
  type DiscountValueType
} from '@/api/types';
import {
  type DataTableSearchParams,
  getSkip,
  parseDataTableSearchParams
} from '@/shared/components/data-table/data-table-utils';
import { DataTableEmptyState } from '@/shared/components/empty-states/data-table-empty-state';

import { DiscountsTableData } from './discounts-table-data';

export const DiscountsTable: FC<Props> = async ({ enabled, ...props }) => {
  const { page, search, size } = parseDataTableSearchParams({ ...props });

  const { items: discounts, pageInfo } = await DiscountService.getAll({
    skip: getSkip(page, size),
    take: size,
    filters: { handle: { contains: search }, enabled: { equals: enabled } }
  });

  if (!discounts.length && !search) {
    return (
      <DataTableEmptyState
        title="You have no discounts"
        description="Create discounts for your products and start selling with discounted prices."
        // TODO: Add action to create discount <SelectDiscountType />
        // action={{ label: 'Add discount', to: '/discounts/new?' }}
      />
    );
  }

  const data: DiscountsTableRow[] = discounts?.map(d => d) ?? [];

  return (
    <DiscountsTableData data={data} defaults={{ page, search, size }} totalRows={pageInfo.total} />
  );
};

export type DiscountsTableRow = {
  id: string;
  handle: string;
  applicationMode: DiscountApplicationMode;
  discountValueType: DiscountValueType;
  discountValue: number;
  enabled: boolean;
  startsAt: Date;
  endsAt?: Date;
  type: DiscountType;
  metadata?: unknown;
};

type Props = DataTableSearchParams & {
  enabled?: boolean;
};
