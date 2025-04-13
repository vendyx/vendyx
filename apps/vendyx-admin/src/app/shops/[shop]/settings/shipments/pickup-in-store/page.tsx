import { LocationService } from '@/api/services/location.service';
import { LocationsList } from '@/core/shipment/components/locations-list/locations-list';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';

export default async function PickupInStorePage() {
  const locations = await LocationService.getAllForPickupInStoreList();

  return (
    <SettingsPageLayout
      title="Pickup in store"
      subtitle="Let customers pick up their orders at your locations"
      backUrl="/settings/shipments"
    >
      <LocationsList locations={locations} />
    </SettingsPageLayout>
  );
}
