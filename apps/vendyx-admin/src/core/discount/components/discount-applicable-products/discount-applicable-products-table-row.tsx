import { type FC } from 'react';

import Link from 'next/link';

import {
  type CommonDiscountApplicableProductFragment,
  type CommonEnhancedProductForSelectorFragment
} from '@/api/types';
import { TableCell, TableRow } from '@/shared/components/ui/table';

export const DiscountApplicableProductsTableRow: FC<Props> = ({ base, product }) => {
  const variants = product.variants.items;

  return (
    <TableRow key={product.id}>
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
            {variants.length} {variants.length > 1 ? 'variants' : 'variant'} selected
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};

type Props = {
  product: CommonDiscountApplicableProductFragment | CommonEnhancedProductForSelectorFragment;
  base: string;
};
