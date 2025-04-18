'use client';

import { type FC } from 'react';

import {
  type CommonCountryForSelectorFragment,
  type CommonDiscountFragment,
  type DiscountType
} from '@/api/types';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { Form } from '@/shared/form/form';
import { ParamNotifications } from '@/shared/notifications/notification-constants';
import { useParamNotification } from '@/shared/notifications/use-param-notification';

import { DiscountContextProvider } from '../../contexts/discount-context';
import { DiscountDetails } from './discount-details';
import { DiscountDetailsFormSubmitButton } from './discount-details-form-submit-button';
import { useDiscountDetailsForm } from './use-discount-details-form';

export const DiscountDetailsForm: FC<Props> = ({ type, discount, countries }) => {
  const form = useDiscountDetailsForm(type, discount);
  useParamNotification(ParamNotifications.EntityCreated, 'Discount created');

  return (
    <DiscountContextProvider value={{ discount, type, isCreating: !discount, countries }}>
      <Form {...form}>
        <form onSubmit={form.onSubmit}>
          <AdminPageLayout
            title={discount ? discount.handle : 'Create discount'}
            actions={<DiscountDetailsFormSubmitButton discount={discount} />}
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
  countries: CommonCountryForSelectorFragment[] | undefined;
  discount?: CommonDiscountFragment;
};
