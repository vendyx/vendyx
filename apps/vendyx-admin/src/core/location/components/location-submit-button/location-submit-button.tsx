import { type DeepPartial, useWatch } from 'react-hook-form';

import { type CommonCountryFragment, type CommonLocationFragment } from '@/api/types';
import { Button } from '@/shared/components/ui/button';

import { useLocationContext } from '../../contexts/location-context';
import {
  type LocationDetailsFormInput,
  useLocationDetailsFormContext
} from '../location-details-form/use-location-details-form';

export const LocationSubmitButton = () => {
  const { location, countries } = useLocationContext();
  const form = useLocationDetailsFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const withRequiredFields =
    Boolean(values.name?.length) &&
    Boolean(values.city?.length) &&
    Boolean(values.phoneNumber?.length) &&
    Boolean(values.postalCode?.length) &&
    Boolean(values.streetLine1?.length);

  const hasChanged = location ? valuesHasChanged(location, values, countries) : true; // is creating a new location
  const isDisabled = !withRequiredFields || form.isLoading || !hasChanged;

  return (
    <Button type="submit" isLoading={form.isLoading} disabled={isDisabled}>
      Save
    </Button>
  );
};

const valuesHasChanged = (
  location: CommonLocationFragment,
  formInput: DeepPartial<LocationDetailsFormInput>,
  countries: CommonCountryFragment[]
) => {
  const country = countries.find(c => c.id === formInput.country);
  const form = {
    name: formInput.name,
    phoneNumber: formInput.phoneNumber,
    streetLine1: formInput.streetLine1,
    streetLine2: formInput.streetLine2,
    city: formInput.city,
    province: country?.states.find(s => s.id === formInput.province)?.name,
    country: country?.name,
    postalCode: formInput.postalCode
  };

  const baseValuesHasChanged = Object.keys(form).some(key => {
    return ((location as any)[key] ?? '') !== ((form as any)[key] ?? '');
  });

  return baseValuesHasChanged;
};
