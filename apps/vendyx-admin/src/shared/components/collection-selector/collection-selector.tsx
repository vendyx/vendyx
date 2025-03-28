import { type FC, useEffect, useMemo, useState } from 'react';

import { type ID } from '@/api/scalars/scalars.type';
import { type Collection } from '@/api/types';
import { DefaultEntitySelectorRow } from '@/shared/components/entity-selector/default-entity-selector-row';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';

import { useCollectionSelector } from './use-collection-selector';

export const CollectionSelector: FC<Props> = ({
  onDone,
  defaultSelected,
  title = 'Add collections',
  description = 'Add collections to your entity',
  triggerText = 'Add Collections'
}) => {
  const { collections, handleSearch, isFetching, refetch } = useCollectionSelector();

  const [selected, setSelected] = useState<string[]>(defaultSelected.map(p => p.id));

  useEffect(() => {
    setSelected(defaultSelected.map(p => p.id));
  }, [defaultSelected]);

  const items = useMemo(() => {
    return [...defaultSelected, ...collections]
      .sort((a, b) => {
        if (selected.includes(a.id)) return -1;
        if (selected.includes(b.id)) return 1;
        return 0;
      })
      .filter((item, index, self) => self.findIndex(i => i.id === item.id) === index);
  }, [collections, defaultSelected]);

  return (
    <EntitySelector
      title={title}
      description={description}
      triggerText={triggerText}
      items={items}
      isFetching={isFetching}
      isDoneAPromise
      onDone={async close => {
        await onDone(selected);
        refetch();
        close();
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
  defaultSelected: Pick<Collection, 'id' | 'name'>[];
  onDone: (selected: ID[]) => Promise<void>;
  title?: string;
  description?: string;
  triggerText?: string;
};
