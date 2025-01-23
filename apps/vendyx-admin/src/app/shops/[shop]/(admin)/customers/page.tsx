import { CustomersTable } from '@/core/customer/components/customers-table/customers-table';
import { type DataTableSearchParams } from '@/shared/components/data-table/data-table-utils';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';

export default async function CustomersPage({ searchParams }: Props) {
  return (
    <AdminPageLayout title="Customers">
      <CustomersTable {...searchParams} />
    </AdminPageLayout>
  );
}

type Props = {
  searchParams: DataTableSearchParams;
};
