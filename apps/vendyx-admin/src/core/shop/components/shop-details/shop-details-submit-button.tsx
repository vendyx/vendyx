import { type FC } from 'react';
import { type DeepPartial, useFormContext, useWatch } from 'react-hook-form';

import { type CommonShopFragment } from '@/api/types';
import { Button } from '@/shared/components/ui/button';

import { type ShopDetailsFormInput } from './use-shop-details-form';

export const ShopDetailsSubmitButton: FC<Props> = ({ shop }) => {
  const form = useFormContext<ShopDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isLoading = (form as any).isLoading as boolean; // This exists in every form, i just need to add it to the type but i'm lazy
  const hasChanged = valuesHasChanged(values, shop);
  const withRequiredValues = Boolean(values.name?.length);

  return (
    <Button isLoading={isLoading} disabled={isLoading || !hasChanged || !withRequiredValues}>
      Save
    </Button>
  );
};

const valuesHasChanged = (
  formValues: DeepPartial<ShopDetailsFormInput>,
  shop: CommonShopFragment
) => {
  // Omit shopApiKey and shopId from the comparison
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { shopApiKey, shopId, socials, ...formInput } = formValues;

  const socialsHasChanged = Object.keys(socials ?? {}).some(
    key => (formValues as any).socials?.[key] !== (shop as any).socials?.[key]
  );

  const generalHasChanged = Object.keys(formInput).some(
    key => (formValues as any)[key] !== (shop as any)[key]
  );

  return socialsHasChanged || generalHasChanged;
};

type Props = {
  shop: CommonShopFragment;
};
