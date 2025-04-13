import { FormInput } from '@/shared/form/form-input';
import { FormPhoneInput } from '@/shared/form/form-phone-input';
import { FormSelect } from '@/shared/form/form-select';

import { useLocationContext } from '../../contexts/location-context';
import { useLocationDetailsFormContext } from '../location-details-form/use-location-details-form';
import { LocationProvinceSelect } from './location-province-select';

export const LocationAddressForm = () => {
  const { countries } = useLocationContext();
  const { control } = useLocationDetailsFormContext();

  return (
    <div className="flex flex-col gap-4">
      <FormPhoneInput control={control} name="phoneNumber" label="Phone number" />
      <FormSelect
        control={control}
        name="country"
        label="Country"
        items={countries.map(c => ({ label: c.name, value: c.id }))}
      />
      <FormInput
        control={control}
        name="streetLine1"
        label="Address"
        placeholder="1234 Industrial Blvd, Suite 200"
      />
      <FormInput control={control} name="streetLine2" label="Apartment, suit, etc." />
      <div className="flex items-center gap-4">
        <FormInput control={control} name="city" label="City" placeholder="Dallas" />
        <FormInput control={control} name="postalCode" label="Postal code" placeholder="75247" />
      </div>
      <LocationProvinceSelect />
    </div>
  );
};
