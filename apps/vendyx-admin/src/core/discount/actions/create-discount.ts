'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { DiscountService } from '@/api/services/discount.service';
import { type CreateDiscountInput } from '@/api/types';
import { ParamNotifications } from '@/shared/notifications/notification-constants';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const createDiscount = async (input: CreateDiscountInput) => {
  const result = await DiscountService.create(input);

  if (!result.success) {
    return { error: result.error, errorCode: result.errorCode };
  }

  const basePath = getBasePathFormHeaders(headers());

  revalidateTag(DiscountService.Tags.discounts);
  redirect(`${basePath}/discounts/${result.discountId}?${ParamNotifications.EntityCreated}=true`);
};
