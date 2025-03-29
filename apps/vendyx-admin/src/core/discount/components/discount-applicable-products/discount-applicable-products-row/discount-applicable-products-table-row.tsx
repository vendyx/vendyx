import { type FC } from 'react';

import { XIcon } from 'lucide-react';
import Link from 'next/link';

import {
  type CommonDiscountApplicableProductFragment,
  type CommonEnhancedProductForSelectorFragment
} from '@/api/types';
import { Button } from '@/shared/components/ui/button';
import { TableCell, TableRow } from '@/shared/components/ui/table';
import { cn } from '@/shared/utils/theme';

import { useDiscountContext } from '../../../contexts/discount-context';
import { getVariantsInMetadata } from '../../../utils/discount-products.utils';
import { useDiscountDetailsFormContext } from '../../discount-details-form/use-discount-details-form';
import { useDiscountApplicableProductsTableRow } from './use-discount-applicable-products-table-row';

export const DiscountApplicableProductsTableRow: FC<Props> = ({ base, product }) => {
  const { getValues } = useDiscountDetailsFormContext();
  const { isCreating } = useDiscountContext();
  const { onRemove, isLoading } = useDiscountApplicableProductsTableRow(product);

  const variants = product.variants.items;
  const variantsInDiscount = getVariantsInMetadata(getValues('metadata'), isCreating);
  const variantsInProduct = variants.filter(v => variantsInDiscount.includes(v.id));

  return (
    <TableRow key={product.id} className={cn(isLoading && 'opacity-50')}>
      <TableCell className="flex items-center gap-2">
        <img
          src={product.assets.items[0].source}
          alt={product.name}
          className="w-10 h-10 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <Link href={`${base}/products/${product.id}`} className="w-full hover:underline">
            {product.name}
          </Link>
          <span className="text-muted-foreground">
            {isCreating
              ? `${variants.length} ${variants.length > 1 ? 'variants' : 'variant'} selected`
              : `${variantsInProduct.length} of ${variants.length} ${variants.length > 1 ? 'variants' : 'variant'}`}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Button isLoading={isLoading} size="icon" variant="link" onClick={onRemove} type="button">
          {!isLoading && <XIcon className="w-4 h-4" />}
        </Button>
      </TableCell>
    </TableRow>
  );
};

type Props = {
  product: CommonDiscountApplicableProductFragment | CommonEnhancedProductForSelectorFragment;
  base: string;
};
