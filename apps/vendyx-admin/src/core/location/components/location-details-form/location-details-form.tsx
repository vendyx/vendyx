'use client';

import { formatDate } from 'date-fns';

import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';
import { Form } from '@/shared/form/form';
import { FormInput } from '@/shared/form/form-input';

import { useLocationContext } from '../../contexts/location-context';
import { InStorePickupCard } from '../in-store-pickup-card/in-store-pickup-card';
import { LocationAddressDialog } from '../location-address-dialog/location-address-dialog';
import { LocationAddressForm } from '../location-address-form/location-address-form';
import { LocationSubmitButton } from '../location-submit-button/location-submit-button';
import { RemoveLocationButton } from '../remove-location/remove-location-button';
import { ToggleActiveLocationButton } from '../toggle-active-location/toggle-active-location-button';
import { useLocationDetailsForm } from './use-location-details-form';

export const LocationDetailsForm = () => {
  const { location } = useLocationContext();
  const form = useLocationDetailsForm();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={location ? location.name : 'Add location'}
          subtitle={
            location
              ? formatDate(location.createdAt, 'dd MMM yyyy')
              : 'Add a location to your store to start receiving in-store pickup orders.'
          }
          backUrl="/settings/locations"
          actions={<LocationSubmitButton />}
        >
          <div className="flex flex-col gap-4">
            <FormInput
              control={form.control}
              name="name"
              description="Name to identify this location."
              label="Name"
              placeholder="Paris warehouse"
              tooltip={
                <span>
                  If this location offers in store pick up <br /> his name will be visible to your
                  customers <br />
                  at checkout and in notifications.
                </span>
              }
            />
            {location ? <LocationAddressDialog /> : <LocationAddressForm />}
            {location && <InStorePickupCard />}
            {location && (
              <div className="w-full flex justify-end gap-2">
                <ToggleActiveLocationButton />
                <RemoveLocationButton />
              </div>
            )}
          </div>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};
