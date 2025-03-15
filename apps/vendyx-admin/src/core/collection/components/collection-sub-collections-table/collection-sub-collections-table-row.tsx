import { type FC } from 'react';

import Link from 'next/link';

import { type CommonCollectionSubCollectionFragment } from '@/api/types';
import { Badge } from '@/shared/components/ui/badge';
import { TableCell, TableRow } from '@/shared/components/ui/table';

export const CollectionSubCollectionsTableRow: FC<Props> = ({ subCollection, base }) => {
  const totalProducts = subCollection.products.count;

  return (
    <TableRow key={subCollection.id}>
      <TableCell>
        <Link href={`${base}/collections/${subCollection.id}`} className="w-full hover:underline">
          {subCollection.name}
        </Link>
      </TableCell>
      <TableCell>
        <p className="text-nowrap">{totalProducts}</p>
      </TableCell>
      <TableCell className="text-nowrap">
        <Badge variant={subCollection.enabled ? 'default' : 'secondary'}>
          {subCollection.enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

type Props = {
  subCollection: CommonCollectionSubCollectionFragment;
  base: string;
};
