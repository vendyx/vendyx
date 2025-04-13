'use client';

import { type FC } from 'react';
import { type DeepPartial, useFormContext, useWatch } from 'react-hook-form';

import { type CommonDiscountFragment, DiscountValueType, OrderRequirementType } from '@/api/types';
import BlockerWhenDirty from '@/shared/components/blocker-when-dirty/blocker-when-dirty';
import { Button, type ButtonProps } from '@/shared/components/ui/button';
import { formatPrice, parsePrice } from '@/shared/utils/formatters';

import { type DiscountDetailsFormInput } from './use-discount-details-form';

export const DiscountDetailsFormSubmitButton: FC<Props> = ({ discount, ...buttonProps }) => {
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
        {...buttonProps}
        type="submit"
        disabled={!hasChanged || !withRequiredValues || isLoading}
        isLoading={isLoading}
      >
        Save
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
    discountValueType: formInput.discountValueType,
    orderRequirementType:
      (formInput.orderRequirementType as any) === 'None' ? null : formInput.orderRequirementType,
    perCustomerLimit: Number(formInput.perCustomerLimit)
  };

  const baseValuesHasChanged = Object.keys(form).some(key => {
    return ((discount as any)[key] ?? '') !== ((form as any)[key] ?? '');
  });

  const discountValueHasChanged =
    formInput.discountValueType === DiscountValueType.Percentage
      ? discount.discountValue !== Number(formInput.discountValuePercentage)
      : discount.discountValue !== parsePrice(formInput.discountValueAmount ?? formatPrice(0));

  const orderRequirementValueHasChanged =
    formInput.orderRequirementType === OrderRequirementType.MinimumAmount
      ? discount.orderRequirementValue !== (formInput.orderRequirementValue ?? 0) * 100
      : discount.orderRequirementValue !== (formInput.orderRequirementValue ?? null);

  return baseValuesHasChanged || discountValueHasChanged || orderRequirementValueHasChanged;
};

type Props = ButtonProps & {
  discount: CommonDiscountFragment | undefined;
};
