import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/api/types';

import { CollectionAssetUploader } from '../collection-asset-uploader/collection-asset-uploader';
import { CollectionContent } from '../collection-content';
import { CollectionContentSelector } from '../collection-content-selector';
import { CollectionGeneralInfoCard } from '../collection-details-cards/collection-general-info-card';
import { CollectionStatusSwitchCard } from '../collection-details-cards/collection-status-switch-card';
import { RemoveCollectionButton } from '../remove-collection/remove-collection-button';

export const CollectionDetails: FC<Props> = ({ collection }) => {
  return (
    <div className="flex flex-col lg:grid grid-cols-4 gap-6">
      <div className="col-span-3 flex flex-col gap-6">
        <CollectionGeneralInfoCard />

        {collection && <CollectionContent collection={collection} />}

        {collection && (
          <div className="flex justify-end">
            <RemoveCollectionButton collection={collection} />
          </div>
        )}

        {!collection && <CollectionContentSelector />}
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <CollectionStatusSwitchCard />
        <CollectionAssetUploader collection={collection} />
      </div>
    </div>
  );
};

type Props = {
  collection?: CommonCollectionFragment;
};
