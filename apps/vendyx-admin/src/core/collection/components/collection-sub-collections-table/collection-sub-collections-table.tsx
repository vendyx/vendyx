import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/api/types';
import { ItemsTable } from '@/shared/components/items-table/items-table';
import { useBase } from '@/shared/hooks/use-base';

import { CollectionSubCollectionsSelector } from '../collection-sub-collection-selector';
import { CollectionSubCollectionsTableRow } from './collection-sub-collections-table-row';
import { useCollectionSubCollectionsTable } from './use-collection-sub-collections-table';

export const CollectionSubCollectionsTable: FC<Props> = ({ collection }) => {
  const base = useBase();
  const { subCollections, isLoading, fetchSubCollections } = useCollectionSubCollectionsTable(
    collection.id
  );

  return (
    <ItemsTable
      title="Sub Collections"
      headers={['Collection', 'Products', 'Status']}
      items={subCollections}
      isLoading={isLoading}
      onChange={async (page, search) => await fetchSubCollections(page, search)}
      renderRow={subCollection => (
        <CollectionSubCollectionsTableRow
          key={subCollection.id}
          subCollection={subCollection}
          base={base}
        />
      )}
      action={
        <CollectionSubCollectionsSelector
          collectionId={collection.id}
          defaultSelected={subCollections}
          onFinishSelection={async () => await fetchSubCollections(1, '')}
        />
      }
    />
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
