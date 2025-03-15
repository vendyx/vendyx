'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { ProductService } from '@/api/services/product.service';

export const removeProductImage = async (
  productId: ID,
  prevImages: { id: string; order: number }[],
  assetId: ID
) => {
  const newAssets = prevImages
    .filter(asset => asset.id !== assetId)
    .map((asset, index) => ({ id: asset.id, order: index }));

  await ProductService.update(productId, {
    assets: newAssets
  });

  revalidateTag(ProductService.Tags.product(productId));
};
