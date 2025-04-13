import { useEffect, useState, useTransition } from 'react';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { LocationErrorCode } from '@/api/types';
import { FormMessages } from '@/shared/form/form-messages';
import { notification } from '@/shared/notifications/notifications';

import { createLocation } from '../../actions/create-location';
import { updateLocation } from '../../actions/update-location';
import { useLocationContext } from '../../contexts/location-context';

export const useLocationDetailsForm = () => {
  const { countries, location } = useLocationContext();
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const defaultCountry = countries.find(c => c.name === location?.country) ?? countries[0];
  const defaultProvince =
    defaultCountry.states.find(s => s.name === location?.province) ?? defaultCountry.states[0];

  console.log({
    defaultCountry,
    defaultProvince
  });

  useEffect(() => {
    if (isSuccess && !isLoading) {
      notification.success('Location updated successfully');
    }
  }, [isSuccess, isLoading]);

  const form = useForm<LocationDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: location?.name ?? '',
      phoneNumber: location?.phoneNumber ?? '',
      country: defaultCountry.id,
      streetLine1: location?.streetLine1 ?? '',
      streetLine2: location?.streetLine2 ?? '',
      city: location?.city ?? '',
      postalCode: location?.postalCode ?? '',
      province: defaultProvince.id
    }
  });

  console.log(form.getValues());

  async function onSubmit(values: LocationDetailsFormInput) {
    startTransition(async () => {
      const country = countries.find(c => c.id === values.country);
      const state = country?.states.find(s => s.id === values.province);

      if (!country) {
        notification.error('Invalid country selected');
        return;
      }

      if (!state) {
        notification.error('Invalid state selected');
        return;
      }

      let result;

      if (location?.id) {
        console.log({
          ...values,
          country: country.name,
          province: state.name
        });
        result = await updateLocation(location.id, {
          ...values,
          country: country.name,
          province: state.name
        });
      } else {
        result = await createLocation({ ...values, country: country.name, province: state.name });
      }

      if (result?.error) {
        if (result.errorCode === LocationErrorCode.LocationNameAlreadyExists) {
          form.setError('name', { message: 'This location name already exists' });
          return;
        }

        notification.error(result.error);
      }

      setIsSuccess(true);
    });
  }

  return {
    ...form,
    isLoading,
    isSuccess,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  phoneNumber: z.string().min(1, FormMessages.required),
  country: z.string().min(1, FormMessages.required),
  streetLine1: z.string().min(1, FormMessages.required),
  streetLine2: z.string().optional(),
  city: z.string().min(1, FormMessages.required),
  postalCode: z.string().min(1, FormMessages.required),
  province: z.string().min(1, FormMessages.required)
});

export type LocationDetailsFormInput = z.infer<typeof schema>;

export const useLocationDetailsFormContext = () =>
  useFormContext<LocationDetailsFormInput>() as UseFormReturn<LocationDetailsFormInput> & {
    isLoading: boolean;
    isSuccess: boolean;
    onSubmit: () => void;
  };
