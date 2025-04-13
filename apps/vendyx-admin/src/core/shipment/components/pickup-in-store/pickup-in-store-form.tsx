'use client';

import { type FC } from 'react';

import { MapPinIcon } from 'lucide-react';

import { type CommonLocationFragment } from '@/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import { Form } from '@/shared/form/form';
import { FormSwitch } from '@/shared/form/form-switch';
import { FormTextarea } from '@/shared/form/form-textarea';

import { PickupInStoreSubmitButton } from './pickup-in-store-submit-button';
import { usePickupInStoreForm } from './use-pickup-in-store-form';

export const PickupInStoreForm: FC<Props> = ({ location }) => {
  const form = usePickupInStoreForm(location.id, location.inStorePickup);

  const description = `${location.streetLine1}, ${location.postalCode} ${location.city}, ${location.province}, ${location.country}`;

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          backUrl={`/settings/shipments/pickup-in-store`}
          title={`In store pickup for ${location.name}`}
          subtitle="Let customers pick up their orders at this location"
          actions={<PickupInStoreSubmitButton preferences={location.inStorePickup} />}
          className="flex flex-col gap-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Accepts in store pickup</CardTitle>
                <CardDescription>
                  Let customers pick up their orders at this location
                </CardDescription>
              </div>
              <div>
                <FormSwitch control={form.control} name="isAvailable" />
              </div>
            </CardHeader>
            <CardContent className="border-t pt-4">
              <div className="flex items-center gap-3">
                <MapPinIcon size={20} />

                <div>
                  <p>{location.name}</p>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
              <CardDescription>
                This message will be sent when the order is marked as ready for pickup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormTextarea
                control={form.control}
                name="instructions"
                placeholder="Bring your confirmation email when you come to collect your order."
              />
            </CardContent>
          </Card>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  location: CommonLocationFragment;
};
