import { type FC, useEffect, useMemo, useState } from 'react';

import { type ID } from '@/api/scalars/scalars.type';
import { type CommonCollectionSubCollectionFragment } from '@/api/types';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/default-entity-selector-row';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { notification } from '@/shared/notifications/notifications';

import { addSubCollections } from '../../actions/add-sub-collections';
import { useCollectionSubCollectionSelector } from './use-collection-sub-collection-selector';

export const CollectionSubCollectionsSelector: FC<Props> = ({
  collectionId,
  defaultSelected,
  onFinishSelection
}) => {
  const { subCollections, handleSearch, isFetching, refetch } =
    useCollectionSubCollectionSelector();

  const [selected, setSelected] = useState<string[]>(defaultSelected.map(p => p.id));

  useEffect(() => {
    setSelected(defaultSelected.map(p => p.id));
  }, [defaultSelected]);

  const items = useMemo(() => {
    return [...defaultSelected, ...subCollections]
      .sort((a, b) => {
        if (selected.includes(a.id)) return -1;
        if (selected.includes(b.id)) return 1;
        return 0;
      })
      .filter((item, index, self) => self.findIndex(i => i.id === item.id) === index);
  }, [subCollections, defaultSelected]);

  return (
    <EntitySelector
      title="Add sub collections"
      description="Add sub collections to your collection"
      triggerText="Add Sub Collections"
      items={items}
      isFetching={isFetching}
      isDoneAPromise
      onDone={async close => {
        await addSubCollections(collectionId, selected);
        refetch();
        close();
        onFinishSelection();
        notification.success('Content updated');
      }}
      onSearch={handleSearch}
      renderItem={collection => (
        <DefaultEntitySelectorRow
          key={collection.id}
          checked={selected.includes(collection.id)}
          label={collection.name}
          onCheckedChange={() => {
            if (selected.includes(collection.id)) {
              setSelected(selected.filter(id => id !== collection.id));
            } else {
              setSelected([...selected, collection.id]);
            }
          }}
        />
      )}
    />
  );
};

type Props = {
  collectionId: ID;
  defaultSelected: CommonCollectionSubCollectionFragment[];
  onFinishSelection: () => void;
};
