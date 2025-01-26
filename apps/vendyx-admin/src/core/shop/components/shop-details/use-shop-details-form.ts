import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonShopFragment, ShopErrorCode } from '@/api/types';
import { FormMessages } from '@/shared/form/form-messages';
import { notification } from '@/shared/notifications/notifications';

import { updateShop } from '../../actions/update-shop';

export const useShopDetailsForm = (shop: CommonShopFragment) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ShopDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: shop.name,
      email: shop.email,
      phoneNumber: shop.phoneNumber,
      socials: {
        facebook: shop.socials?.facebook ?? '',
        twitter: shop.socials?.twitter ?? '',
        instagram: shop.socials?.instagram ?? ''
      },
      shopApiKey: shop.shopApiKey,
      shopId: shop.id
    }
  });

  useEffect(
    function resetFormOnRefetch() {
      form.reset({
        name: shop.name,
        email: shop.email,
        phoneNumber: shop.phoneNumber,
        socials: {
          facebook: shop.socials?.facebook ?? '',
          twitter: shop.socials?.twitter ?? '',
          instagram: shop.socials?.instagram ?? ''
        },
        shopApiKey: shop.shopApiKey,
        shopId: shop.id
      });
    },
    [shop]
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success('Shop updated successfully');
      setIsSuccess(false);
    }
  }, [isSuccess, isLoading]);

  async function onSubmit(values: ShopDetailsFormInput) {
    startTransition(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { shopApiKey, shopId, socials, ...rest } = values;
      const { facebook, twitter, instagram } = socials;

      const result = await updateShop(shop.slug, {
        ...rest,
        socials: { facebook, twitter, instagram }
      });

      if (result?.error) {
        if (result.errorCode === ShopErrorCode.EmailAlreadyExists) {
          form.setError('email', { message: result.error });
          return;
        }

        notification.error(result.error);
      }

      setIsSuccess(true);
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  email: z.string().email(FormMessages.invalidEmail),
  phoneNumber: z.string().min(1, FormMessages.invalidPhoneNumber),
  socials: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional()
  }),
  shopApiKey: z.string().readonly().optional(),
  shopId: z.string().readonly().optional()
});

export type ShopDetailsFormInput = z.infer<typeof schema>;
