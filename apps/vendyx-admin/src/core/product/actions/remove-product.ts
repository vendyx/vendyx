'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { ProductService } from '@/api/services/product.service';
import { getBasePathFormHeaders } from '@/shared/utils/url';

export const removeProduct = async (ids: string[]) => {
  const isOk = await ProductService.massiveRemove(ids);

  if (!isOk) {
    return { error: 'Failed to remove products' };
  }

  const base = getBasePathFormHeaders(headers());

  revalidateTag(ProductService.Tags.products);
  redirect(`${base}/products`);
};
