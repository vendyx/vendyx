'use client';

import { type FC } from 'react';
import { type DeepPartial, useFormContext, useWatch } from 'react-hook-form';

import { type CommonDiscountFragment, DiscountValueType } from '@/api/types';
import BlockerWhenDirty from '@/shared/components/blocker-when-dirty/blocker-when-dirty';
import { Button } from '@/shared/components/ui/button';

import { type DiscountDetailsFormInput } from './use-discount-details-form';

export const DiscountDetailsFormSubmitButton: FC<Props> = ({ discount }) => {
  const form = useFormContext<DiscountDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const hasChanged = discount ? valuesHasChanged(discount, values) : true; // is creating a new collection;
  const isLoading = (form as any).isLoading as boolean; // This exists in every form, i just need to add it to the type but i'm lazy
  const withRequiredValues = !!values.handle?.length && !!values.startsAt;

  const isDirty = !(!withRequiredValues || isLoading || !hasChanged);

  return (
    <>
      <BlockerWhenDirty isDirty={isDirty} />
      <Button
        type="submit"
        disabled={!hasChanged || !withRequiredValues || isLoading}
        isLoading={isLoading}
      >
        Save discount
      </Button>
    </>
  );
};

const valuesHasChanged = (
  discount: CommonDiscountFragment,
  formInput: DeepPartial<DiscountDetailsFormInput>
) => {
  const form = {
    handle: formInput.handle,
    applicationMode: formInput.applicationMode,
    enabled: formInput.enabled,
    startsAt: formInput.startsAt,
    endsAt: formInput.endsAt,
    discountValue:
      formInput.discountValueType === DiscountValueType.FixedAmount
        ? Number((formInput.discountValue ?? 0) * 100)
        : formInput.discountValue,
    discountValueType: formInput.discountValueType,
    orderRequirementValue: formInput.orderRequirementValue ?? null
  };

  return Object.keys(form).some(key => {
    return ((discount as any)[key] ?? '') !== ((form as any)[key] ?? '');
  });
};

type Props = {
  discount: CommonDiscountFragment | undefined;
};
