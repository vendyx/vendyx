import { Suspense } from 'react';

import { DiscountsTable } from '@/core/discount/components/discounts-table';
import { SelectDiscountToAddButton } from '@/core/discount/components/select-discount-to-add/select-discount-to-add-button';
import { type DataTableSearchParams } from '@/shared/components/data-table/data-table-utils';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { DataTableSkeleton } from '@/shared/components/skeletons/data-table-skeletons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

export default function DiscountsPage({ searchParams }: Props) {
  return (
    <AdminPageLayout title="Discounts" actions={<SelectDiscountToAddButton />}>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Suspense fallback={<DataTableSkeleton />}>
            <DiscountsTable {...searchParams} />
          </Suspense>
        </TabsContent>

        <TabsContent value="active">
          <Suspense fallback={<DataTableSkeleton />}>
            <DiscountsTable {...searchParams} enabled />
          </Suspense>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};
