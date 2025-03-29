import { DiscountApplicationMode } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormInput } from '@/shared/form/form-input';
import { FormRadioGroup } from '@/shared/form/form-radio-group';

import { useDiscountDetailsFormContext } from '../discount-details-form/use-discount-details-form';
import { DiscountHandle } from '../discount-handle/discount-handle';
import { DiscountValue } from '../discount-value/discount-value';

export const DiscountGeneralCard = () => {
  const { control } = useDiscountDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <FormRadioGroup
          className="flex-row"
          control={control}
          name="applicationMode"
          items={[
            {
              label: 'Discount code',
              value: DiscountApplicationMode.Code
            },
            {
              label: 'Automatic discount',
              value: DiscountApplicationMode.Automatic
            }
          ]}
        />
        <div className="flex gap-4">
          <DiscountHandle />
          <FormInput
            control={control}
            type="number"
            name="perCustomerLimit"
            label="Per customer limit"
            className="w-full h-fit"
          />
        </div>
        <DiscountValue />
      </CardContent>
    </Card>
  );
};
