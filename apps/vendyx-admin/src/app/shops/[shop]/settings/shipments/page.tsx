import { ZoneService } from '@/api/services/zone.service';
import { ZonesTable } from '@/core/shipment/components/zones-table/zones-table';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';

export default async function ShipmentsPage() {
  const zones = await ZoneService.getAll();

  return (
    <SettingsPageLayout title="Shipments" subtitle="Manage your rates depending on your zones">
      <ZonesTable zones={zones} />
    </SettingsPageLayout>
  );
}
