import { type FC, useEffect, useState } from 'react';

import { type ID, type ShippingDiscountMetadata } from '@/api/scalars/scalars.type';
import { type CommonCountryForSelectorFragment } from '@/api/types';
import { useDiscountContext } from '@/core/discount/contexts/discount-context';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/default-entity-selector-row';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';

import { useDiscountDetailsFormContext } from '../../discount-details-form/use-discount-details-form';
import { useDiscountCountrySelector } from './use-discount-country-selector';

export const DiscountCountrySelector: FC<Props> = ({ defaultSelected }) => {
  const { countries = [], isCreating } = useDiscountContext();
  const { setValue } = useDiscountDetailsFormContext();
  const { onSelect } = useDiscountCountrySelector();

  const [items, setItems] = useState<CommonCountryForSelectorFragment[]>(countries);
  const [selectedCountries, setSelectedCountries] = useState<CommonCountryForSelectorFragment[]>(
    defaultSelected.map(
      id => countries.find(c => c.id === id) as unknown as CommonCountryForSelectorFragment
    )
  );

  useEffect(() => {
    setSelectedCountries(
      defaultSelected.map(
        id => countries.find(c => c.id === id) as unknown as CommonCountryForSelectorFragment
      )
    );
  }, [defaultSelected]);

  return (
    <EntitySelector
      title="Add countries"
      description="Add countries to this discount"
      triggerText="Add countries"
      items={items}
      isFetching={false}
      isDoneAPromise={!isCreating}
      onDone={async close => {
        if (isCreating) {
          setValue('metadata', {
            countries: selectedCountries.map(c => c.id),
            allCountries: false
          } satisfies ShippingDiscountMetadata);
          close();
        } else {
          onSelect(
            selectedCountries.map(c => c.id),
            close
          );
        }
      }}
      onSearch={q =>
        setItems(countries.filter(c => c.name.toLowerCase().includes(q.toLowerCase())))
      }
      renderItem={country => (
        <DefaultEntitySelectorRow
          key={country.id}
          label={country.name}
          checked={selectedCountries.some(c => c.id === country.id)}
          onCheckedChange={checked =>
            setSelectedCountries(prev =>
              checked ? [...prev, country] : prev.filter(c => c.id !== country.id)
            )
          }
        />
      )}
    />
  );
};

type Props = {
  defaultSelected: ID[];
};
