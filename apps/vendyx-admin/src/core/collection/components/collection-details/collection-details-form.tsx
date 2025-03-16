'use client';

import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/api/types';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { EntityProvider } from '@/shared/contexts/entity-context';
import { Form } from '@/shared/form/form';
import { ParamNotifications } from '@/shared/notifications/notification-constants';
import { useParamNotification } from '@/shared/notifications/use-param-notification';

import { CollectionDetails } from './collection-details';
import { CollectionDetailsSubmitButton } from './collection-details-submit-button';
import { useCollectionDetailsForm } from './use-collection-details-form';

export const CollectionDetailsForm: FC<Props> = ({ collection }) => {
  const form = useCollectionDetailsForm(collection);
  useParamNotification(ParamNotifications.EntityCreated, 'Collection created');

  return (
    <EntityProvider entity={collection}>
      <Form {...form}>
        <form onSubmit={form.onSubmit}>
          <AdminPageLayout
            title={collection?.name ?? 'New Collection'}
            actions={<CollectionDetailsSubmitButton collection={collection} />}
          >
            <CollectionDetails collection={collection} />
          </AdminPageLayout>
        </form>
      </Form>
    </EntityProvider>
  );
};

type Props = {
  collection?: CommonCollectionFragment;
};
