import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { type CommonCustomerFragment } from '@/api/types';
import BlockerWhenDirty from '@/shared/components/blocker-when-dirty/blocker-when-dirty';
import { Button } from '@/shared/components/ui/button';

import { type CustomerDetailsFormInput } from './use-customer-details-form';

export const CustomerDetailsSubmitButton: FC<Props> = ({ customer, isLoading }) => {
  const form = useFormContext<CustomerDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isDisabled = !valuesHasChanged(customer, values as CustomerDetailsFormInput);

  return (
    <>
      <BlockerWhenDirty isDirty={!isDisabled} />
      <Button disabled={isDisabled || isLoading} isLoading={isLoading} type="submit">
        Save
      </Button>
    </>
  );
};

export const valuesHasChanged = (
  customer: CommonCustomerFragment,
  formInput: CustomerDetailsFormInput
) => {
  return Object.keys(formInput).some(key => {
    return ((customer as any)[key] ?? '') !== ((formInput as any)[key] ?? '');
  });
};

type Props = {
  isLoading: boolean;
  customer: CommonCustomerFragment;
};
