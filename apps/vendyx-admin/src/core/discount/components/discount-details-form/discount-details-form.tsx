'use client';

import { type FC } from 'react';

import { type CommonDiscountFragment, type DiscountType } from '@/api/types';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { Form } from '@/shared/form/form';
import { ParamNotifications } from '@/shared/notifications/notification-constants';
import { useParamNotification } from '@/shared/notifications/use-param-notification';

import { DiscountContextProvider } from '../../contexts/discount-context';
import { DiscountDetails } from './discount-details';
import { DiscountDetailsFormSubmitButton } from './discount-details-form-submit-button';
import { useDiscountDetailsForm } from './use-discount-details-form';

export const DiscountDetailsForm: FC<Props> = ({ type, discount }) => {
  const form = useDiscountDetailsForm(type, discount);
  useParamNotification(ParamNotifications.EntityCreated, 'Discount created');

  console.log({
    form: form.formState.errors
  });

  return (
    <DiscountContextProvider value={{ discount, type, isCreating: !discount }}>
      <Form {...form}>
        <form onSubmit={form.onSubmit}>
          <AdminPageLayout
            title={discount ? discount.handle : 'Create discount'}
            actions={<DiscountDetailsFormSubmitButton />}
            maxWidth
          >
            <DiscountDetails />
          </AdminPageLayout>
        </form>
      </Form>
    </DiscountContextProvider>
  );
};

type Props = {
  type: DiscountType;
  discount?: CommonDiscountFragment;
};
