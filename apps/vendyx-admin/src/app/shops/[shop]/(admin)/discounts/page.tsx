import { Suspense } from 'react';

import { DiscountsTable } from '@/core/discount/components/discounts-table';
import { SelectDiscountToAddButton } from '@/core/discount/components/select-discount-to-add/select-discount-to-add-button';
import { type DataTableSearchParams } from '@/shared/components/data-table/data-table-utils';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { DataTableSkeleton } from '@/shared/components/skeletons/data-table-skeletons';

export default function DiscountsPage({ searchParams }: Props) {
  return (
    <AdminPageLayout title="Discounts" actions={<SelectDiscountToAddButton />}>
      <Suspense fallback={<DataTableSkeleton />}>
        <DiscountsTable {...searchParams} />
      </Suspense>
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};
