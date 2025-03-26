'use client';

import { type FC } from 'react';

import { type CommonShopFragment } from '@/api/types';
import { CopyToClipboardButton } from '@/shared/components/copy-to-clipboard/copy-to-clipboard-button';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';
import { Label } from '@/shared/components/ui/label';
import { Separator } from '@/shared/components/ui/separator';
import { Form } from '@/shared/form/form';
import { FormInput } from '@/shared/form/form-input';
import { FormPhoneInput } from '@/shared/form/form-phone-input';

import { GenerateShopApiKeyButton } from '../generate-shop-api-key/generate-shop-api-key-button';
import { ShopLogoUploader } from '../shop-logo-uploader/shop-logo-uploader';
import { ShopDetailsSubmitButton } from './shop-details-submit-button';
import { useShopDetailsForm } from './use-shop-details-form';

export const ShopDetailsForm: FC<Props> = ({ shop }) => {
  const form = useShopDetailsForm(shop);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title="Store details"
          subtitle="Update your store settings."
          actions={<ShopDetailsSubmitButton shop={shop} />}
        >
          <div className="flex flex-col gap-4">
            <FormInput control={form.control} label="Name" name="name" placeholder="Store name" />
            <FormInput
              control={form.control}
              label="Email"
              name="email"
              placeholder="m@example.com"
            />
            <FormPhoneInput label="Phone number" control={form.control} name="phoneNumber" />
            <div className="flex flex-col gap-2">
              <Label>Upload your logo</Label>
              <ShopLogoUploader shop={shop} />
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold">Socials</h3>
              <p className="text-sm text-gray-500">Add your social media links to your store.</p>
            </div>
            <div className="flex flex-col gap-2">
              <FormInput control={form.control} name="socials.facebook" placeholder="Facebook" />
              <FormInput control={form.control} name="socials.twitter" placeholder="Twitter" />
              <FormInput control={form.control} name="socials.instagram" placeholder="Instagram" />
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold">API keys</h3>
              <p className="text-sm text-gray-500">
                API keys are used to authenticate your store with our servers. Do not share them
                with anyone.
              </p>
            </div>

            <div className="flex items-end gap-2">
              <FormInput control={form.control} label="Shop ID" name="shopId" disabled isPassword />
              <CopyToClipboardButton variant="outline" value={shop.id} />
            </div>

            <div className="flex items-end gap-2">
              <FormInput
                control={form.control}
                label="Shop Api key"
                name="shopApiKey"
                disabled
                isPassword
              />
              <CopyToClipboardButton variant="outline" value={shop.shopApiKey} />
              <GenerateShopApiKeyButton />
            </div>
          </div>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  shop: CommonShopFragment;
};
