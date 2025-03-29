import { type FC } from 'react';

import Link from 'next/link';

import { type CommonDiscountApplicableProductFragment } from '@/api/types';
import { TableCell, TableRow } from '@/shared/components/ui/table';

export const DiscountApplicableProductsTableRow: FC<Props> = ({ base, product }) => {
  const variants = product.variants.items;

  return (
    <TableRow key={product.id}>
      <TableCell>
        <Link href={`${base}/products/${product.id}`} className="w-full hover:underline">
          {product.name} {variants.length} {variants.length > 1 ? 'variants' : 'variant'}
        </Link>
      </TableCell>
    </TableRow>
  );
};

type Props = {
  product: CommonDiscountApplicableProductFragment;
  base: string;
};
