import { type FC } from 'react';

import { CollectionContentType, type CommonCollectionFragment } from '@/api/types';

import { CollectionProductsTable } from '../collection-products-table/collection-products-table';
import { CollectionSubCollectionsTable } from '../collection-sub-collections-table/collection-sub-collections-table';

export const CollectionContent: FC<Props> = ({ collection }) => {
  if (collection.contentType === CollectionContentType.Products) {
    return <CollectionProductsTable collection={collection} />;
  }

  if (collection.contentType === CollectionContentType.Collections) {
    return <CollectionSubCollectionsTable collection={collection} />;
  }

  return null;
};

type Props = {
  collection: CommonCollectionFragment;
};
