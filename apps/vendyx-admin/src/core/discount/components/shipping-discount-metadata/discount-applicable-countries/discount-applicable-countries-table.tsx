import { type ShippingDiscountMetadata } from '@/api/scalars/scalars.type';
import { useDiscountContext } from '@/core/discount/contexts/discount-context';
import { ItemsTable } from '@/shared/components/items-table/items-table';

import { useDiscountDetailsFormContext } from '../../discount-details-form/use-discount-details-form';
import { DiscountCountrySelector } from '../discount-country-selector/discount-country-selector';
import { DiscountApplicableCountriesTableRow } from './discount-applicable-countries-table-row/discount-applicable-countries-table-row';

export const DiscountApplicableCountriesTable = () => {
  const { countries: allCountries = [] } = useDiscountContext();
  const { watch } = useDiscountDetailsFormContext();
  const metadata = watch('metadata') as ShippingDiscountMetadata;

  const selectedCountries = metadata.countries ?? [];
  const countries = allCountries?.filter(c => selectedCountries.includes(c.id));

  return (
    <ItemsTable
      hideMutators
      title="Countries"
      headers={['Country', '']}
      items={countries}
      renderRow={country => (
        <DiscountApplicableCountriesTableRow
          key={country.id}
          country={country}
          selectedCountries={selectedCountries}
        />
      )}
      action={<DiscountCountrySelector defaultSelected={[...countries.map(c => c.id)]} />}
    />
  );
};
