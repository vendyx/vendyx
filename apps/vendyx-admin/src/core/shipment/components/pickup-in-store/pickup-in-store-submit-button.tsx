import { type FC } from 'react';
import { useWatch } from 'react-hook-form';

import { type CommonInStorePickupFragment } from '@/api/types';
import { Button } from '@/shared/components/ui/button';

import { usePickupInStoreFormContext } from './use-pickup-in-store-form';

export const PickupInStoreSubmitButton: FC<Props> = ({ preferences }) => {
  const form = usePickupInStoreFormContext();
  const formValues = useWatch({ defaultValue: form.getValues() });

  const hasChanged =
    formValues.instructions !== preferences.instructions ||
    formValues.isAvailable !== preferences.isAvailable;

  const withRequiredFields = !!formValues.instructions?.length;

  return (
    <Button
      type="submit"
      isLoading={form.isLoading}
      disabled={!hasChanged || form.isLoading || !withRequiredFields}
    >
      Save
    </Button>
  );
};

type Props = {
  preferences: CommonInStorePickupFragment;
};
