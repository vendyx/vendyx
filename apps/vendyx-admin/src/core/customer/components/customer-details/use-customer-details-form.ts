'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonCustomerFragment } from '@/api/types';
import { FormMessages } from '@/shared/form/form-messages';
import { notification } from '@/shared/notifications/notifications';

import { updateCustomer } from '../../actions/update-customer';

export const useCustomerDetailsForm = (customer: CommonCustomerFragment) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<CustomerDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: customer.firstName ?? '',
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber ?? '',
      enabled: customer.enabled
    }
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success('Customer updated successfully');
      setIsSuccess(false);
    }
  }, [isLoading, isSuccess]);

  async function onSubmit(values: CustomerDetailsFormInput) {
    startTransition(async () => {
      const result = await updateCustomer(customer.id, values);

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      setIsSuccess(true);
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  firstName: z.string().min(1, FormMessages.required),
  lastName: z.string().min(1, FormMessages.required),
  email: z.string().email({ message: FormMessages.invalidEmail }),
  phoneNumber: z.string().min(10, FormMessages.invalidPhoneNumber).optional().or(z.literal('')),
  enabled: z.boolean()
});

export type CustomerDetailsFormInput = z.infer<typeof schema>;
