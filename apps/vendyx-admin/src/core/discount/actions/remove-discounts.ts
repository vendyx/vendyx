'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { DiscountService } from '@/api/services/discount.service';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const removeDiscounts = async (ids: ID[]) => {
  await DiscountService.remove(ids);

  const base = getBasePathFormHeaders(headers());

  revalidateTag(DiscountService.Tags.discounts);
  redirect(`${base}/discounts`);
};
