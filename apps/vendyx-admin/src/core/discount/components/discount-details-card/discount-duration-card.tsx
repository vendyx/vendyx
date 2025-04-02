import { addMonths, formatDate } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormDatePicker } from '@/shared/form/form-date-picker';

import { useDiscountDetailsFormContext } from '../discount-details-form/use-discount-details-form';

export const DiscountDurationCard = () => {
  const { control, watch } = useDiscountDetailsFormContext();

  const startsAt = watch('startsAt');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Duration</CardTitle>
      </CardHeader>

      <CardContent className="flex items-start gap-4">
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
          disabledDates={date => date < startsAt}
        />
      </CardContent>
    </Card>
  );
};
