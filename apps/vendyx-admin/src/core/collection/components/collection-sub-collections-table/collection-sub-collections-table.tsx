import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/api/types';
import { CollectionSelector } from '@/shared/components/collection-selector/collection-selector';
import { ItemsTable } from '@/shared/components/items-table/items-table';
import { useBase } from '@/shared/hooks/use-base';

import { addSubCollections } from '../../actions/add-sub-collections';
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
        <CollectionSelector
          title="Add sub collections"
          description="Add sub collections to your collection"
          triggerText="Add Sub Collections"
          defaultSelected={subCollections}
          onDone={async selected => {
            await addSubCollections(collection.id, selected);
            await fetchSubCollections(1, '');
          }}
        />
      }
    />
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
