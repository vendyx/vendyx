import { type FC, useEffect, useMemo, useState } from 'react';

import { type CommonDiscountApplicableProductFragment } from '@/api/types';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/default-entity-selector-row';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { notification } from '@/shared/notifications/notifications';

import { useDiscountProductSelector } from './use-discount-product-selector';

export const DiscountProductSelector: FC<Props> = ({ defaultProducts }) => {
  const { products, handleSearch, isFetching } = useDiscountProductSelector();

  const [selected, setSelected] = useState<string[]>(defaultProducts.map(p => p.id));

  useEffect(() => {
    setSelected(defaultProducts.map(p => p.id));
  }, [defaultProducts]);

  const items = useMemo(() => {
    return products.sort((a, b) => {
      if (selected.includes(a.id)) return -1;
      if (selected.includes(b.id)) return 1;
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
      isDoneAPromise
      onDone={async close => {
        close();
        notification.success('Content updated');
      }}
      onSearch={handleSearch}
      renderItem={product => (
        <DefaultEntitySelectorRow
          key={product.id}
          checked={selected.includes(product.id)}
          label={product.name}
          onCheckedChange={() => {
            if (selected.includes(product.id)) {
              setSelected(selected.filter(id => id !== product.id));
            } else {
              setSelected([...selected, product.id]);
            }
          }}
        />
      )}
    />
  );
};

type Props = {
  defaultProducts: CommonDiscountApplicableProductFragment[];
};
