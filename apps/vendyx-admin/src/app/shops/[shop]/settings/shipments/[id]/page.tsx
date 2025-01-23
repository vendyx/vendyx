import { notFound } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { CountryService } from '@/api/services/country.service';
import { ShippingMethodService } from '@/api/services/shipping-method.service';
import { ZoneService } from '@/api/services/zone.service';
import { ZoneDetailsForm } from '@/core/shipment/components/zone-details/zone-details-form';
import { EntityProvider } from '@/shared/contexts/entity-context';

export default async function ZoneDetailsPage({ params: { id } }: { params: { id: ID } }) {
  const [zone, countries, shippingHandlers] = await Promise.all([
    ZoneService.getById(id),
    CountryService.getAll(),
    ShippingMethodService.getHandlers()
  ]);

  if (!zone) {
    notFound();
  }

  return (
    <EntityProvider entity={{ countries, shippingHandlers, zone }}>
      <ZoneDetailsForm zone={zone} />
    </EntityProvider>
  );
}
