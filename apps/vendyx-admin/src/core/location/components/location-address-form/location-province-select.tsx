import { useEffect, useMemo } from 'react';

import { FormSelect } from '@/shared/form/form-select';

import { useLocationContext } from '../../contexts/location-context';
import { useLocationDetailsFormContext } from '../location-details-form/use-location-details-form';

export const LocationProvinceSelect = () => {
  const { countries } = useLocationContext();
  const { control, watch, setValue } = useLocationDetailsFormContext();

  const selectedCountry = watch('country');

  const states = useMemo(() => {
    const country = countries.find(c => c.id === selectedCountry);
    return country?.states ?? [];
  }, [selectedCountry]);

  useEffect(() => {
    setValue('province', states[0]?.id);
  }, [states]);

  return (
    <FormSelect
      control={control}
      name="province"
      label="Province"
      items={states.map(s => ({ label: s.name, value: s.id }))}
    />
  );
};
