import { DiscountApplicationMode } from '@/api/types';
import { generateDiscountCode } from '@/core/discount/utils/generate-discount.utils';
import { Button } from '@/shared/components/ui/button';
import { FormInput } from '@/shared/form/form-input';

import { useDiscountDetailsFormContext } from '../../discount-details-form/use-discount-details-form';

export const DiscountHandle = () => {
  const { control, getValues, setValue } = useDiscountDetailsFormContext();

  const applicationMode = getValues('applicationMode');

  const onGenerate = () => {
    const code = generateDiscountCode();
    setValue('handle', code);
  };

  if (applicationMode === DiscountApplicationMode.Code) {
    return (
      <div className="flex gap-2 items-top w-full">
        <FormInput
          control={control}
          name="handle"
          label="Code"
          placeholder="0000"
          description="Customers must enter this code on the payment screen"
        />
        <Button type="button" variant="secondary" className="mt-[22px]" onClick={onGenerate}>
          Generate
        </Button>
      </div>
    );
  }

  // Automatic
  return (
    <FormInput
      control={control}
      name="handle"
      label="Automatic"
      placeholder="Campaign discount"
      description="Customers will see this name on the checkout screen"
    />
  );
};
