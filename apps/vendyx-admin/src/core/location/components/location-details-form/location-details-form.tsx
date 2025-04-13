'use client';

import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';
import { Form } from '@/shared/form/form';
import { FormInput } from '@/shared/form/form-input';

import { LocationAddressForm } from '../location-address-form/location-address-form';
import { useLocationDetailsForm } from './use-location-details-form';

export const LocationDetailsForm = () => {
  const form = useLocationDetailsForm();

  return (
    <SettingsPageLayout
      title="Add location"
      subtitle="Add a location to your store to start receiving in-store pickup orders."
      backUrl="/settings/locations"
      // actions={
      //   <PaymentMethodSubmitButton handlers={handlers} isLoading={form.isLoading} method={method} />
      // }
    >
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.onSubmit}>
          <FormInput
            control={form.control}
            name="name"
            description="Name to identify this location. If this location offers in store pick up his name will be visible to your customers at checkout and in notifications."
            label="Name"
            placeholder="Paris warehouse"
          />
          <LocationAddressForm />
        </form>
      </Form>
    </SettingsPageLayout>
  );
};
