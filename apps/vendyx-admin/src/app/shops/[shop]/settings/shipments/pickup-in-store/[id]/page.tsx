import { notFound } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { LocationService } from '@/api/services/location.service';
import { PickupInStoreForm } from '@/core/shipment/components/pickup-in-store/pickup-in-store-form';

export default async function PickupInStoreLocationPage({ params }: { params: { id: ID } }) {
  const location = await LocationService.getById(params.id);

  if (!location) {
    return notFound();
  }

  return <PickupInStoreForm location={location} />;
}
