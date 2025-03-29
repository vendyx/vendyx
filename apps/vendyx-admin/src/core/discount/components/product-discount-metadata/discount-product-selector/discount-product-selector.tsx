import { type FC, useEffect, useMemo, useState } from 'react';

import { type ID } from '@/api/scalars/scalars.type';
import { useDiscountContext } from '@/core/discount/contexts/discount-context';
import { AccordionEntitySelectorRow } from '@/shared/components/entity-selector/accordion-entity-selector-row';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';

import { groupVariantsByProducts } from '../../../utils/discount-products.utils';
import {
  type InMemoryProductDiscountMetadata,
  useDiscountDetailsFormContext
} from '../../discount-details-form/use-discount-details-form';
import { useGetDiscountProductSelector } from './use-get-discount-product-selector';
import { useSelectProductsForDiscount } from './use-select-products-for-discount';

export const DiscountProductSelector: FC<Props> = ({ defaultVariants }) => {
  const { products, handleSearch, isFetching } = useGetDiscountProductSelector();
  const { onSelect } = useSelectProductsForDiscount();
  const { setValue } = useDiscountDetailsFormContext();
  const { isCreating } = useDiscountContext();

  const [selectedVariants, setSelectedVariants] = useState<string[]>(defaultVariants);

  useEffect(() => {
    setSelectedVariants(defaultVariants);
  }, [defaultVariants]);

  const items = useMemo(() => {
    return products.sort((a, b) => {
      if (selectedVariants.includes(a.id)) return -1;
      if (selectedVariants.includes(b.id)) return 1;
      return 0;
    });
  }, [products]);

  return (
    <EntitySelector
      title="Add products"
      description="Add products to this discount"
      triggerText="Add products"
      items={items}
      isFetching={isFetching}
      isDoneAPromise={!isCreating}
      onDone={async close => {
        if (isCreating) {
          setValue('metadata', {
            inMemoryProductsSelected: groupVariantsByProducts(items, selectedVariants)
          } satisfies InMemoryProductDiscountMetadata);
          close();
        } else {
          onSelect(selectedVariants, close);
        }
      }}
      onSearch={handleSearch}
      renderItem={product => (
        <AccordionEntitySelectorRow
          key={product.id}
          value={product.id}
          checked={selectedVariants.some(v => product.variants.items.some(v2 => v2.id === v))}
          onCheckedChange={checked => {
            if (checked) {
              setSelectedVariants([...selectedVariants, ...product.variants.items.map(v => v.id)]);
            } else {
              const variantsIds = product.variants.items.map(v => v.id);

              setSelectedVariants(
                selectedVariants.filter(selectedVariant => !variantsIds.includes(selectedVariant))
              );
            }
          }}
          label={product.name}
          image={product.assets.items?.[0]?.source}
          content={product.variants.items.map(variant => ({
            id: variant.id,
            label: variant.optionValues.map(v => v.name).join(' / '),
            checked: selectedVariants.includes(variant.id),
            onCheckedChange: checked => {
              if (checked) {
                setSelectedVariants([...selectedVariants, variant.id]);
              } else {
                setSelectedVariants(selectedVariants.filter(v => v !== variant.id));
              }
            }
          }))}
        />
      )}
    />
  );
};

type Props = {
  defaultVariants: ID[];
};
