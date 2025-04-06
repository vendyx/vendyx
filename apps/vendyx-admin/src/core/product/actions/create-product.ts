'use server';

import { redirect } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { AssetService, type VendyxAsset } from '@/api/services/asset.service';
import { OptionService } from '@/api/services/option.services';
import { ProductService } from '@/api/services/product.service';
import { TagService } from '@/api/services/tag.service';
import { VariantService } from '@/api/services/variant.service';
import { ParamNotifications } from '@/shared/notifications/notification-constants';
import { isUUID } from '@/shared/utils/validators';

export const createProduct = async (input: CreateProductInput) => {
  if (!input.variants.length) {
    throw new Error('createProduct: At least one variant is required');
  }

  let images: Omit<VendyxAsset, 'order'>[] = [];

  if (input.images.has('files')) {
    images = await AssetService.upload(input.images);
  }

  const tags: ID[] = [];

  if (input.tags?.length) {
    const tagsToCreate = input.tags.filter(tag => !isUUID(tag));
    const tagsToAdd = input.tags.filter(tag => isUUID(tag));

    if (tagsToCreate.length) {
      const result = await TagService.create(tagsToCreate.map(tag => ({ name: tag })));

      if (result.success) {
        tags.push(...result.tags);
      }
    }

    tags.push(...tagsToAdd);
  }

  const product = await ProductService.create({
    name: input.name,
    description: input.description,
    enabled: input.enabled,
    tags,
    assets: images.map((image, i) => ({ id: image.id, order: i }))
  });

  if (!input.options?.length) {
    await createVariants(product.id, input.variants);
    redirect(`${product.id}?${ParamNotifications.EntityCreated}=true`);
  }

  const options = await createOptions(product.id, input.options);

  const newVariants = attachOptionValues(options, input.variants);
  await createVariants(product.id, newVariants);

  redirect(`${product.id}?${ParamNotifications.EntityCreated}=true`);
};

const attachOptionValues = (
  options: CreateProductInput['options'],
  variants: CreateProductInput['variants']
) => {
  return variants.map(variant => {
    const variantOptionValues = variant.optionValues ?? [];

    const valuesIds = options
      .map(option => {
        const value = option.values.find(value =>
          variantOptionValues.map(variantValue => variantValue.name).includes(value.name)
        );

        return value?.id ?? '';
      })
      .filter(Boolean);

    return {
      ...variant,
      optionValues: valuesIds.map(id => ({ id, name: '' }))
    };
  });
};

const createVariants = async (productId: string, variants: CreateProductInput['variants']) => {
  for (const variant of variants) {
    await VariantService.create(productId, {
      salePrice: variant.salePrice,
      comparisonPrice: variant.comparisonPrice,
      stock: variant.stock,
      sku: variant.sku,
      requiresShipping: variant.requiresShipping,
      optionValues: variant.optionValues?.map(value => value.id)
    });
  }
};

const createOptions = async (productId: string, input: CreateProductInput['options']) => {
  if (!input?.length) return [];

  const options = [];
  let order = 0;

  for (const option of input) {
    const result = await OptionService.create(productId, {
      order,
      name: option.name,
      values: option.values.map((value, i) => ({ name: value.name, order: i }))
    });

    options.push(result);
    order++;
  }

  return options;
};

type CreateProductInput = {
  name: string;
  description?: string;
  enabled?: boolean;
  images: FormData;
  tags: string[] | undefined;
  options: {
    id: string;
    name: string;
    values: { id: string; name: string }[];
  }[];
  variants: {
    salePrice: number;
    comparisonPrice?: number;
    stock?: number;
    sku?: string;
    requiresShipping?: boolean;
    optionValues?: { id: string; name: string }[];
  }[];
};
