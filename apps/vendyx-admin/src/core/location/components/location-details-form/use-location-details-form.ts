import { useTransition } from 'react';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormMessages } from '@/shared/form/form-messages';

import { useLocationContext } from '../../contexts/location-context';

export const useLocationDetailsForm = () => {
  const { countries } = useLocationContext();
  const [isLoading, startTransition] = useTransition();

  const defaultCountry = countries[0];

  const form = useForm<LocationDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      country: defaultCountry.id,
      streetLine1: '',
      streetLine2: '',
      city: '',
      pc: '',
      province: defaultCountry.states[0].id
    }
  });

  async function onSubmit(values: LocationDetailsFormInput) {
    startTransition(() => {
      console.log('Form submitted with values:', values);
    });
  }

  return {
    ...form,
    isLoading,
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
  pc: z.string().min(1, FormMessages.required),
  province: z.string().min(1, FormMessages.required)
});

export type LocationDetailsFormInput = z.infer<typeof schema>;

export const useLocationDetailsFormContext = () =>
  useFormContext<LocationDetailsFormInput>() as UseFormReturn<LocationDetailsFormInput> & {
    isLoading: boolean;
    onSubmit: () => void;
  };
