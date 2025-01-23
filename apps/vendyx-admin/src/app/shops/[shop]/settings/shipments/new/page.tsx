import { CountryService } from '@/api/services/country.service';
import { ShippingMethodService } from '@/api/services/shipping-method.service';
import { ZoneDetailsForm } from '@/core/shipment/components/zone-details/zone-details-form';
import { EntityProvider } from '@/shared/contexts/entity-context';

export default async function NewZonePage() {
  const [countries, shippingHandlers] = await Promise.all([
    CountryService.getAll(),
    ShippingMethodService.getHandlers()
  ]);

  return (
    <EntityProvider entity={{ countries, shippingHandlers }}>
      <ZoneDetailsForm />
    </EntityProvider>
  );
}
