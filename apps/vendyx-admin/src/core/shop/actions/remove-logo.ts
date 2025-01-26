'use server';

import { revalidateTag } from 'next/cache';

import { ShopService } from '@/api/services/shop.service';

export const removeLogo = async (shopSlug: string) => {
  await ShopService.update(shopSlug, { logo: '' });

  revalidateTag(ShopService.Tags.shop(shopSlug));
};
