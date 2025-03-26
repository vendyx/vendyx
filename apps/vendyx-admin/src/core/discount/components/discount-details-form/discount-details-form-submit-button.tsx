'use client';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';

import { type DiscountDetailsFormInput } from './use-discount-details-form';

export const DiscountDetailsFormSubmitButton = () => {
  const form = useFormContext<DiscountDetailsFormInput>();

  const isLoading = (form as any).isLoading as boolean; // This exists in every form, i just need to add it to the type but i'm lazy

  return (
    <Button type="submit" isLoading={isLoading}>
      Save discount
    </Button>
  );
};
