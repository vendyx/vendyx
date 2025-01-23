import { Suspense } from 'react';

import Link from 'next/link';

import { ProductTable } from '@/core/product/components/products-table/product-table';
import { type DataTableSearchParams } from '@/shared/components/data-table/data-table-utils';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { DataTableSkeleton } from '@/shared/components/skeletons/data-table-skeletons';
import { Button } from '@/shared/components/ui/button';

export default function ProductsPage({ searchParams }: Props) {
  return (
    <AdminPageLayout
      title="Products"
      actions={
        <Link href="products/new">
          <Button>Add product</Button>
        </Link>
      }
    >
      <Suspense fallback={<DataTableSkeleton />}>
        <ProductTable {...searchParams} />
      </Suspense>
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};
