import { DiscountValueType } from '@/api/types';
import { FormInput } from '@/shared/form/form-input';
import { FormSelect } from '@/shared/form/form-select';

import { useDiscountDetailsFormContext } from '../discount-details-form/use-discount-details-form';

export const DiscountValue = () => {
  const { control, getValues } = useDiscountDetailsFormContext();

  const discountValueType = getValues('discountValueType');
  const isPercentage = discountValueType === DiscountValueType.Percentage;

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
      <FormInput
        control={control}
        name="discountValue"
        rightElement={<span className="text-muted-foreground">{isPercentage ? '%' : '$'}</span>}
      />
    </div>
  );
};
