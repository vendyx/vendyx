import React, { type FC } from 'react';

import { RemoveEntityButton } from '@/shared/components/remove-entity/remove-entity-button';

import { type CollectionsTableRow } from '../collections-table/collections-table';
import { useRemoveMassiveCollections } from './use-remove-massive-collection';

export const RemoveMassiveCollectionButton: FC<Props> = ({ rows, onFinish }) => {
  const { removeMassiveCollection, isLoading } = useRemoveMassiveCollections(onFinish);

  const entitiesId = rows.map(row => row.id);

  return (
    <RemoveEntityButton
      title={'Remove all selected collections'}
      description="This action cannot be undone"
      onRemove={async () => await removeMassiveCollection(entitiesId)}
      isLoading={isLoading}
    />
  );
};

type Props = {
  rows: CollectionsTableRow[];
  onFinish: () => void;
};
