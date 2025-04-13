import { LocationService } from '@/api/services/location.service';
import { LocationsTable } from '@/core/location/components/locations-table/locations-table';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';

export default async function LocationsPage() {
  const locations = await LocationService.getAll();

  return (
    <SettingsPageLayout title="Locations" subtitle="Manage your store locations">
      <LocationsTable locations={locations} />
    </SettingsPageLayout>
  );
}
