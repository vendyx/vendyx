import { Injectable } from '@nestjs/common';

import {
  CreateProductInput,
  ProductFilters,
  ProductListInput,
  UpdateProductInput
} from '@/api/shared/types/gql.types';
import { ProductRepository } from '@/persistence/repositories/product.repository';
import { ID } from '@/persistence/types/scalars.type';

import { clean } from '../shared/utils/clean.utils';
import { getSlugBy } from '../shared/utils/slug.utils';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  // TODO: Refactor to take an object for filters
  async find(input?: ProductListInput, byCollectionId?: ID, byVariantIds?: ID[]) {
    return this.productRepository.findMany({
      ...input,
      collectionId: byCollectionId,
      variantsIds: byVariantIds,
      filters: {
        archived: { equals: false },
        ...input?.filters
      }
    });
  }

  // TODO: Refactor to take an object for filters
  async count(input?: ProductListInput, byCollectionId?: ID, byVariantIds?: ID[]) {
    return this.productRepository.count({
      ...input,
      collectionId: byCollectionId,
      variantsIds: byVariantIds,
      filters: {
        archived: { equals: false },
        ...input?.filters
      }
    });
  }

  async findUnique(id: string, slug: string, filters?: ProductFilters) {
    if (id) {
      return this.productRepository.findById(id, filters);
    }

    if (slug) {
      return this.productRepository.findBySlug(slug);
    }

    return null;
  }

  async create(input: CreateProductInput) {
    const slug = await this.validateAndParseSlug(input.name);

    const product = await this.productRepository.insert({
      ...clean(input),
      slug,
      assets: input.assets
        ? { create: input.assets.map(asset => ({ assetId: asset.id, order: asset.order })) }
        : undefined,
      tags: input.tags ? { create: input.tags.map(tag => ({ tagId: tag })) } : undefined
    });

    return product;
  }

  async update(id: string, input: UpdateProductInput) {
    const productAssets = await this.productRepository.findAssets(id);
    const productTags = await this.productRepository.findTags(id);

    const assetsToRemove = productAssets
      .map(a => a.assetId)
      .filter(assetId => {
        return !input?.assets?.some(asset => asset.id === assetId);
      });

    const tagsToRemove = productTags
      .map(t => t.tagId)
      .filter(tagId => {
        return !input?.tags?.some(tag => tag === tagId);
      });

    return this.productRepository.update(id, {
      ...clean(input),
      assets: input.assets
        ? {
            connectOrCreate: input.assets.map(asset => ({
              where: { productId_assetId: { productId: id, assetId: asset.id } },
              create: { assetId: asset.id, order: asset.order }
            })),
            delete: assetsToRemove.map(asset => ({
              productId_assetId: { productId: id, assetId: asset }
            }))
          }
        : undefined,
      tags: input.tags
        ? {
            connectOrCreate: input.tags.map(tag => ({
              where: { productId_tagId: { productId: id, tagId: tag } },
              create: { tagId: tag }
            })),
            delete: tagsToRemove.map(tag => ({
              productId_tagId: { productId: id, tagId: tag }
            }))
          }
        : undefined
    });
  }

  async softRemove(ids: string[]) {
    await Promise.all(
      ids.map(async id => {
        await this.productRepository.hardDeleteOptions(id);
        await this.productRepository.hardDeleteAssets(id);
        await this.productRepository.hardDeleteTags(id);
        await this.productRepository.softDelete(id);
      })
    );

    return true;
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const productNameCount = await this.productRepository.count({
      filters: { name: { equals: name } }
    });

    if (!productNameCount) return slug;

    return slug + '-' + productNameCount;
  }
}
