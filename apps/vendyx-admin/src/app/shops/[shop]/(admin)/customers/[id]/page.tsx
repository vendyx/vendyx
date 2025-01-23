import { notFound } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { CustomerService } from '@/api/services/customer.service';
import { CustomerDetailsForm } from '@/core/customer/components/customer-details/customer-details-form';
import { EntityProvider } from '@/shared/contexts/entity-context';

export default async function CustomerDetailsPage({ params }: { params: { id: ID } }) {
  const customer = await CustomerService.getById(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <EntityProvider entity={customer}>
      <CustomerDetailsForm customer={customer} />
    </EntityProvider>
  );
}
