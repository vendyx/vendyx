import { addMonths, formatDate } from 'date-fns';

import { DiscountApplicationMode } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormDatePicker } from '@/shared/form/form-date-picker';
import { FormInput } from '@/shared/form/form-input';
import { FormRadioGroup } from '@/shared/form/form-radio-group';

import { DiscountHandle } from '../discount-handle/discount-handle';
import { DiscountValue } from '../discount-value/discount-value';
import { useDiscountDetailsFormContext } from './use-discount-details-form';

export const DiscountDetails = () => {
  const { control } = useDiscountDetailsFormContext();
  return (
    <div className="flex flex-col gap-6">
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
              name="perCustomerLimit"
              label="Per customer limit"
              className="w-full h-fit"
            />
          </div>
          <DiscountValue />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Duration</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-4">
          <FormDatePicker
            control={control}
            name="startsAt"
            label="Starts at"
            placeholder={formatDate(new Date(), 'PPP')}
          />
          <FormDatePicker
            control={control}
            name="endsAt"
            label="Ends at"
            placeholder={formatDate(addMonths(new Date(), 1), 'PPP')}
          />
        </CardContent>
      </Card>
    </div>
  );
};
