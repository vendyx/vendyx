'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { ProductService } from '@/api/services/product.service';

export const removeMassiveProducts = async (ids: ID[]) => {
  const isOk = await ProductService.massiveRemove(ids);

  if (!isOk) {
    return { error: 'Failed to remove products' };
  }

  revalidateTag(ProductService.Tags.products);
};
