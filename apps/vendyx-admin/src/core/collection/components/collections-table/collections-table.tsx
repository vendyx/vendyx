import { type FC } from 'react';

import { CollectionService } from '@/api/services/collection.service';
import { type CollectionContentType } from '@/api/types';
import {
  type DataTableSearchParams,
  getSkip,
  parseDataTableSearchParams
} from '@/shared/components/data-table/data-table-utils';
import { DataTableEmptyState } from '@/shared/components/empty-states/data-table-empty-state';

import CollectionTableData from './collection-table-data';

export const CollectionsTable: FC<Props> = async props => {
  const { page, search, size } = parseDataTableSearchParams({ ...props });

  const { items: collections, pageInfo } = await CollectionService.getAll({
    skip: getSkip(page, size),
    take: size,
    filters: { name: { contains: search } }
  });

  if (!collections.length && !search) {
    return (
      <DataTableEmptyState
        title="You have no collections"
        description="Group your products by collections."
        action={{ label: 'Add collection', to: '/collections/new' }}
      />
    );
  }

  const data: CollectionsTableRow[] =
    collections?.map(c => {
      const totalProducts = c.products.count;
      const totalSubCollections = c.subCollections.count;
      const image = c.assets.items[0]?.source;

      return {
        id: c.id,
        name: c.name,
        image,
        totalProducts,
        totalSubCollections,
        status: c.enabled,
        contentType: c.contentType
      };
    }) ?? [];

  return (
    <CollectionTableData
      data={data}
      pagination={{ page, search, size }}
      totalRows={pageInfo.total}
    />
  );
};

export type CollectionsTableRow = {
  id: string;
  image: string;
  name: string;
  totalProducts: number;
  totalSubCollections: number;
  status: boolean;
  contentType: CollectionContentType;
};

type Props = DataTableSearchParams;
