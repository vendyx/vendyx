import { Suspense } from 'react';

import Link from 'next/link';

import { CollectionsTable } from '@/core/collection/components/collections-table/collections-table';
import { type DataTableSearchParams } from '@/shared/components/data-table/data-table-utils';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { DataTableSkeleton } from '@/shared/components/skeletons/data-table-skeletons';
import { Button } from '@/shared/components/ui/button';

export default function CollectionsPage({ searchParams }: Props) {
  return (
    <AdminPageLayout
      title="Collections"
      actions={
        <Link href="collections/new">
          <Button>Add Collection</Button>
        </Link>
      }
    >
      <Suspense fallback={<DataTableSkeleton />}>
        <CollectionsTable {...searchParams} />
      </Suspense>
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};
