import { OrderRequirementType } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormInput } from '@/shared/form/form-input';
import { FormRadioGroup } from '@/shared/form/form-radio-group';

import { useDiscountDetailsFormContext } from '../discount-details-form/use-discount-details-form';

export const DiscountRequirementsCard = () => {
  const { control } = useDiscountDetailsFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4">
        <FormRadioGroup
          control={control}
          defaultValue={'None' as unknown as OrderRequirementType}
          name="orderRequirementType"
          items={[
            { label: 'There is no requirements', value: 'None' },
            {
              label: 'Minimum purchase amount',
              value: OrderRequirementType.MinimumAmount,
              slot: (
                <FormInput
                  control={control}
                  name="orderRequirementValue"
                  placeholder="0"
                  type="number"
                />
              )
            },
            {
              label: 'Minimum purchase items',
              value: OrderRequirementType.MinimumItems,
              slot: (
                <FormInput
                  control={control}
                  name="orderRequirementValue"
                  isPrice
                  placeholder="$ 0.00"
                />
              )
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};
