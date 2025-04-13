import { notFound } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { CountryService } from '@/api/services/country.service';
import { LocationService } from '@/api/services/location.service';
import { LocationDetailsForm } from '@/core/location/components/location-details-form/location-details-form';
import { LocationContextProvider } from '@/core/location/contexts/location-context';

export default async function LocationDetailsPage({ params }: { params: { id: ID } }) {
  const countries = await CountryService.getAll();
  const location = await LocationService.getById(params.id);

  if (!location) {
    notFound();
  }

  return (
    <LocationContextProvider value={{ countries, isCreating: false, location }}>
      <LocationDetailsForm />
    </LocationContextProvider>
  );
}
