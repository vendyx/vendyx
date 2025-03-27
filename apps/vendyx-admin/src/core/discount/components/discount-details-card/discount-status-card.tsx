import { Card, CardContent } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { FormSwitch } from '@/shared/form/form-switch';

import { useDiscountDetailsFormContext } from '../discount-details-form/use-discount-details-form';

export const DiscountStatusCard = () => {
  const { control } = useDiscountDetailsFormContext();

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 mt-6">
        <Label className="text-base">Discount status</Label>
        <FormSwitch control={control} name="enabled" label="Active" />
      </CardContent>
    </Card>
  );
};
