'use client';

import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { Form } from '@/shared/form/form';
import { ParamNotifications } from '@/shared/notifications/notification-constants';
import { useParamNotification } from '@/shared/notifications/use-param-notification';

import { DiscountDetails } from './discount-details';
import { DiscountDetailsFormSubmitButton } from './discount-details-form-submit-button';
import { useDiscountDetailsForm } from './use-discount-details-form';

export const DiscountDetailsForm = () => {
  const form = useDiscountDetailsForm();
  useParamNotification(ParamNotifications.EntityCreated, 'Discount created');

  return (
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
  );
};
