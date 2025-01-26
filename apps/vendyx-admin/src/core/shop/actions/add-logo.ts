'use server';

import { revalidateTag } from 'next/cache';

import { AssetService } from '@/api/services/asset.service';
import { ShopService } from '@/api/services/shop.service';

export const addLogo = async (shopSlug: string, logo: FormData) => {
  const [newAsset] = await AssetService.upload(logo);

  await ShopService.update(shopSlug, { logo: newAsset.source });

  revalidateTag(ShopService.Tags.shop(shopSlug));
};
