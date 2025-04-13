import { useEffect, useState, useTransition } from 'react';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type ID } from '@/api/scalars/scalars.type';
import { type CommonInStorePickupFragment } from '@/api/types';
import { notification } from '@/shared/notifications/notifications';

import { updateInStorePickupPreferences } from '../../actions/update-in-store-pickup-preferences';

export const usePickupInStoreForm = (locationId: ID, preferences: CommonInStorePickupFragment) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      isAvailable: preferences.isAvailable,
      instructions: preferences.instructions ?? ''
    }
  });

  useEffect(() => {
    if (isSuccess && !isLoading) {
      notification.success('Preferences updated');
    }
  }, [isSuccess, isLoading]);

  async function onSubmit(values: FormInput) {
    startTransition(async () => {
      const result = await updateInStorePickupPreferences(locationId, values);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
    });
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    isSuccess
  };
};

const schema = z.object({
  isAvailable: z.boolean(),
  instructions: z.string().optional()
});

export type FormInput = z.infer<typeof schema>;

export const usePickupInStoreFormContext = () =>
  useFormContext<FormInput>() as UseFormReturn<FormInput> & {
    isLoading: boolean;
    isSuccess: boolean;
  };
