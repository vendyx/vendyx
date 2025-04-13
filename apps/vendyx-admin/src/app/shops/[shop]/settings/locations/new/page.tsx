import { CountryService } from '@/api/services/country.service';
import { LocationDetailsForm } from '@/core/location/components/location-details-form/location-details-form';
import { LocationContextProvider } from '@/core/location/contexts/location-context';

export default async function LocationDetailsPage() {
  const countries = await CountryService.getAll();

  return (
    <LocationContextProvider value={{ countries }}>
      <LocationDetailsForm />
    </LocationContextProvider>
  );
}
