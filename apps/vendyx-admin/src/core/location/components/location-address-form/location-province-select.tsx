import { useEffect, useMemo } from 'react';

import { FormSelect } from '@/shared/form/form-select';

import { useLocationContext } from '../../contexts/location-context';
import { useLocationDetailsFormContext } from '../location-details-form/use-location-details-form';

export const LocationProvinceSelect = () => {
  const { countries } = useLocationContext();
  const { control, watch, setValue, getValues } = useLocationDetailsFormContext();

  const selectedCountry = watch('country');

  const states = useMemo(() => {
    const country = countries.find(c => c.id === selectedCountry);
    return country?.states ?? [];
  }, [selectedCountry]);

  useEffect(() => {
    const defaultProvince = getValues('province');

    const country = countries.find(c => c.id === selectedCountry);

    if (country?.states.find(s => s.id === defaultProvince)) return;

    setValue('province', states[0]?.id);
  }, [selectedCountry]);

  return (
    <FormSelect
      control={control}
      name="province"
      label="Province"
      items={states.map(s => ({ label: s.name, value: s.id }))}
    />
  );
};
