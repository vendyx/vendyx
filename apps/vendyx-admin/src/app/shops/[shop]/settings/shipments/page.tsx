import { LocationService } from '@/api/services/location.service';
import { ZoneService } from '@/api/services/zone.service';
import { PickupInStoreCard } from '@/core/shipment/components/pickup-in-store/pickup-in-store-card';
import { ZonesTable } from '@/core/shipment/components/zones-table/zones-table';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';

export default async function ShipmentsPage() {
  const [zones, locations] = await Promise.all([
    ZoneService.getAll(),
    LocationService.getAllNames()
  ]);

  return (
    <SettingsPageLayout
      title="Shipments"
      subtitle="Manage your rates depending on your zones"
      className="flex flex-col gap-4"
    >
      <ZonesTable zones={zones} />
      <PickupInStoreCard locations={locations} />
    </SettingsPageLayout>
  );
}
