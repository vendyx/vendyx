import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonProductFragment } from '@/api/types';
import { Combobox } from '@/shared/components/ui/combobox';
import { isUUID } from '@/shared/utils/validators';

import { type ProductDetailsFormInput } from '../../product-details/use-product-details-form';
import { useProductTags } from './use-product-tags';

export const ProductTags: FC<Props> = ({ product }) => {
  const { setValue } = useFormContext<ProductDetailsFormInput>();
  const { isLoading, allTags } = useProductTags();

  return (
    <Combobox
      label="Tags"
      isLoading={isLoading}
      items={allTags.map(tag => ({ value: tag.id, label: tag.name }))}
      defaultSelected={product?.tags.map(t => ({ value: t.id, label: t.name }))}
      onSelectedChange={selected =>
        setValue(
          'tags',
          selected.map(tag => (isUUID(tag.value) ? tag.value : tag.label))
        )
      }
    />
  );
};

type Props = {
  product: CommonProductFragment | undefined;
};
