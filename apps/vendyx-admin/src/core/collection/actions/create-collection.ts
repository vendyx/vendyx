'use server';

import { redirect } from 'next/navigation';

import { AssetService } from '@/api/services/asset.service';
import { CollectionService } from '@/api/services/collection.service';
import { type CreateCollectionInput } from '@/api/types';

export const createCollection = async (input: Input) => {
  const image = input.image.has('files') ? await AssetService.upload(input.image) : null;

  const collection = await CollectionService.create({
    name: input.name,
    description: input.description,
    enabled: input.enabled,
    assets: image ? [{ id: image[0].id }] : [],
    products: input.products
  });

  redirect(`${collection.id}?new=true`);
};

type Input = Pick<CreateCollectionInput, 'name' | 'description' | 'enabled' | 'products'> & {
  image: FormData;
};
