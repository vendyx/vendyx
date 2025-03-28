import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormRadioGroup } from '@/shared/form/form-radio-group';

import {
  DiscountAppliesTo,
  useDiscountDetailsFormContext
} from '../discount-details-form/use-discount-details-form';

export const ProductDiscountMetadata = () => {
  const { control } = useDiscountDetailsFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applies to</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <FormRadioGroup
          className="flex-row"
          control={control}
          name="appliesTo"
          items={[
            { label: 'Specific collections', value: DiscountAppliesTo.Collections },
            { label: 'Specific products', value: DiscountAppliesTo.Products }
          ]}
        />
      </CardContent>
    </Card>
  );
};
