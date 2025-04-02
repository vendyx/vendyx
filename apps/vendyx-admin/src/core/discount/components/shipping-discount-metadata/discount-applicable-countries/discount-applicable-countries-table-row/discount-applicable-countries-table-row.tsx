import { type FC } from 'react';

import { XIcon } from 'lucide-react';

import { type ID, type ShippingDiscountMetadata } from '@/api/scalars/scalars.type';
import { type CommonCountryForSelectorFragment } from '@/api/types';
import { useDiscountContext } from '@/core/discount/contexts/discount-context';
import { Button } from '@/shared/components/ui/button';
import { TableCell, TableRow } from '@/shared/components/ui/table';
import { cn } from '@/shared/utils/theme';

import { useDiscountDetailsFormContext } from '../../../discount-details-form/use-discount-details-form';
import { useRemoveDiscountCountry } from './use-remove-discount-country';

export const DiscountApplicableCountriesTableRow: FC<Props> = ({ country, selectedCountries }) => {
  const { isCreating } = useDiscountContext();
  const { watch, setValue } = useDiscountDetailsFormContext();
  const { isLoading: isRemoving, removeCountry } = useRemoveDiscountCountry();

  const metadata = watch('metadata') as ShippingDiscountMetadata;

  return (
    <TableRow className={cn(isRemoving && 'opacity-50')}>
      <TableCell className="">
        <span>{country.name}</span>
      </TableCell>
      <TableCell className="text-right">
        <Button
          size="icon"
          variant="link"
          type="button"
          isLoading={isRemoving}
          onClick={() => {
            if (isCreating) {
              setValue('metadata', {
                ...metadata,
                countries: selectedCountries.filter(c => c !== country.id)
              } satisfies ShippingDiscountMetadata);
            } else {
              removeCountry(country.id);
            }
          }}
        >
          {!isRemoving && <XIcon size={16} />}
        </Button>
      </TableCell>
    </TableRow>
  );
};

type Props = {
  country: CommonCountryForSelectorFragment;
  selectedCountries: ID[];
};
