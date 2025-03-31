import { useEffect } from 'react';

import { DiscountValueType } from '@/api/types';
import { useDiscountContext } from '@/core/discount/contexts/discount-context';
import { FormInput } from '@/shared/form/form-input';
import { FormSelect } from '@/shared/form/form-select';
import { formatPrice } from '@/shared/utils/formatters';

import { useDiscountDetailsFormContext } from '../../discount-details-form/use-discount-details-form';

export const DiscountValue = () => {
  const { discount } = useDiscountContext();
  const { control, watch, setValue, getValues } = useDiscountDetailsFormContext();

  const discountValueType = watch('discountValueType');
  const isPercentage = discountValueType === DiscountValueType.Percentage;

  /**
   * Effect to change discount value depending on the discount value type
   * This is not done by react-hook-form why? idk
   *
   * So, every time the discount value type changes, we set the value of the discount (if present) to maintain already persisted value
   * or we put the default value (0) if there is no discount that is being edited
   *
   * Ej. if the discount value type is percentage, and change to fixed amount, we set the value of the fixed amount to 0
   * if comes back to percentage, we set the value of the discount (or if is creating, just 0)
   */
  useEffect(() => {
    const discountValueType = getValues('discountValueType');

    setValue(
      discountValueType === DiscountValueType.Percentage
        ? 'discountValuePercentage'
        : 'discountValueAmount',
      discountValueType === DiscountValueType.Percentage // form discount value type is percentage
        ? discount?.discountValueType === DiscountValueType.Percentage // if there is a discount value type (editing)
          ? discount?.discountValue // keep already persisted value
          : 0
        : discount?.discountValueType === DiscountValueType.FixedAmount // if there is a discount value type (editing)
          ? formatPrice(discount?.discountValue) // keep already persisted value
          : formatPrice(0)
    );
  }, [discountValueType]);

  return (
    <div className="flex items-end gap-4">
      <FormSelect
        className="w-48"
        control={control}
        name="discountValueType"
        label="Discount value"
        items={[
          { label: 'Percentage', value: DiscountValueType.Percentage },
          { label: 'Fixed amount', value: DiscountValueType.FixedAmount }
        ]}
      />
      {isPercentage ? (
        <FormInput
          control={control}
          name="discountValuePercentage"
          rightElement={<span className="text-muted-foreground">%</span>}
        />
      ) : (
        <FormInput
          control={control}
          name="discountValueAmount"
          isPrice
          rightElement={<span className="text-muted-foreground">$</span>}
        />
      )}
    </div>
  );
};
