import { useFormContext } from 'react-hook-form';

import { CollectionContentType } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormRadioGroup } from '@/shared/form/form-radio-group';

import { type CollectionDetailsFormInput } from '../collection-details/use-collection-details-form';

export const CollectionContentSelector = () => {
  const { control } = useFormContext<CollectionDetailsFormInput>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content type</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FormRadioGroup
          control={control}
          name="contentType"
          items={[
            {
              label: 'Products',
              value: CollectionContentType.Products,
              description: 'A normal collection containing products.'
            },
            {
              label: 'Collections',
              value: CollectionContentType.Collections,
              description:
                'Convert this collection into a parent collection containing sub collections.'
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};
