'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { DiscountService } from '@/api/services/discount.service';
import { type UpdateDiscountInput } from '@/api/types';

export const updateDiscount = async (id: ID, input: UpdateDiscountInput) => {
  const result = await DiscountService.update(id, input);

  if (!result.success) {
    return { error: result.error, errorCode: result.errorCode };
  }

  revalidateTag(DiscountService.Tags.discount(result.discountId));
  revalidateTag(DiscountService.Tags.discounts);
};
