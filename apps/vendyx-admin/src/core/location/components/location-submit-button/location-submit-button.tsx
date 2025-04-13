import { useWatch } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';

import { useLocationDetailsFormContext } from '../location-details-form/use-location-details-form';

export const LocationSubmitButton = () => {
  const form = useLocationDetailsFormContext();
  const values = useWatch({ defaultValue: form.getValues() });

  const withRequiredFields =
    Boolean(values.name?.length) &&
    Boolean(values.city?.length) &&
    Boolean(values.phoneNumber?.length) &&
    Boolean(values.postalCode?.length) &&
    Boolean(values.streetLine1?.length);

  const isDisabled = !withRequiredFields || form.isLoading;

  return (
    <Button type="submit" isLoading={form.isLoading} disabled={isDisabled}>
      Save
    </Button>
  );
};
