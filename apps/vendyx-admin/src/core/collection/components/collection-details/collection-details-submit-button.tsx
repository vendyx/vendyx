import { type FC } from 'react';
import { type DeepPartial, useFormContext, useWatch } from 'react-hook-form';

import { type CommonCollectionFragment } from '@/api/types';
import { Button } from '@/shared/components/ui/button';
import useWarningDirtyForm from '@/shared/hooks/use-warning-dirty-form';

import { type CollectionDetailsFormInput } from './use-collection-details-form';

export const CollectionDetailsSubmitButton: FC<Props> = ({ collection }) => {
  const form = useFormContext<CollectionDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const hasChanged = collection ? valuesHasChanged(collection, values) : true; // is creating a new collection;
  const isLoading = (form as any).isLoading as boolean; // This exists in every form, i just need to add it to the type but i'm lazy
  const withRequiredValues = Boolean(values.name?.length);

  const isDirty = !(!withRequiredValues || isLoading || !hasChanged);

  useWarningDirtyForm(isDirty);

  return (
    <Button
      disabled={!hasChanged || !withRequiredValues || isLoading}
      isLoading={isLoading}
      type="submit"
    >
      Save
    </Button>
  );
};

export const valuesHasChanged = (
  collection: CommonCollectionFragment,
  formInput: DeepPartial<CollectionDetailsFormInput>
) => {
  const form = {
    name: formInput.name,
    description: formInput.description,
    enabled: formInput.enabled
  };

  return Object.keys(form).some(key => {
    return ((collection as any)[key] ?? '') !== ((formInput as any)[key] ?? '');
  });
};

type Props = {
  collection?: CommonCollectionFragment;
};
