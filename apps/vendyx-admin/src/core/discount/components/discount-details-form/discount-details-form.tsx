'use client';

import { type FC } from 'react';

import { type CommonDiscountFragment, type DiscountType } from '@/api/types';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { EntityProvider } from '@/shared/contexts/entity-context';
import { Form } from '@/shared/form/form';
import { ParamNotifications } from '@/shared/notifications/notification-constants';
import { useParamNotification } from '@/shared/notifications/use-param-notification';

import { DiscountDetails } from './discount-details';
import { DiscountDetailsFormSubmitButton } from './discount-details-form-submit-button';
import { useDiscountDetailsForm } from './use-discount-details-form';

export const DiscountDetailsForm: FC<Props> = ({ type, discount }) => {
  const form = useDiscountDetailsForm(discount);
  useParamNotification(ParamNotifications.EntityCreated, 'Discount created');

  return (
    <EntityProvider entity={{ type, discount }}>
      <Form {...form}>
        <form onSubmit={form.onSubmit}>
          <AdminPageLayout
            title={`Create Discount`}
            actions={<DiscountDetailsFormSubmitButton />}
            maxWidth
          >
            <DiscountDetails />
          </AdminPageLayout>
        </form>
      </Form>
    </EntityProvider>
  );
};

type Props = {
  type: DiscountType;
  discount?: CommonDiscountFragment;
};
