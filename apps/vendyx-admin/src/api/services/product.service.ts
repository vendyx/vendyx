import { getFragmentData } from '../codegen';
import {
  type CreateProductInput,
  type ProductListInput,
  type UpdateProductInput
} from '../codegen/graphql';
import {
  COMMON_DISCOUNT_APPLICABLE_PRODUCT_FRAGMENT,
  COMMON_ENHANCED_PRODUCT_FOR_SELECTOR,
  COMMON_PRODUCT_FOR_SELECTOR,
  COMMON_PRODUCT_FRAGMENT,
  CREATE_PRODUCT_MUTATION,
  GET_ALL_ENHANCED_PRODUCTS_FOR_SELECTOR_QUERY,
  GET_ALL_PRODUCTS_FOR_SELECTOR_QUERY,
  GET_ALL_PRODUCTS_QUERY,
  GET_DISCOUNT_APPLICABLE_PRODUCTS_QUERY,
  GET_PRODUCT_BY_ID_QUERY,
  REMOVE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION
} from '../operations/product.operations';
import { type ID } from '../scalars/scalars.type';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const ProductService = {
  Tags: {
    products: 'products',
    products_for_selector: 'products-for-selector',
    product: (id: string) => `product-${id}`
  },

  async getAll(input?: ProductListInput) {
    const { products } = await serviceGqlFetcher(
      GET_ALL_PRODUCTS_QUERY,
      { input },
      { tags: [ProductService.Tags.products] }
    );

    return products;
  },

  async getAllForSelector(query: string) {
    const result = await serviceGqlFetcher(
      GET_ALL_PRODUCTS_FOR_SELECTOR_QUERY,
      { input: { filters: { enabled: { equals: true }, name: { contains: query } }, take: 30 } },
      { tags: [ProductService.Tags.products_for_selector] }
    );

    return result.products.items.map(product =>
      getFragmentData(COMMON_PRODUCT_FOR_SELECTOR, product)
    );
  },

  /**
   * @description
   * Get all enabled products with variants.
   * Can be filtered by name and only take 30 products per request, to avoid overloading the server,
   * so maybe to get an specific you will need to pass the query with the name of the product.
   */
  async getAllEnhancedForSelector(query: string) {
    const result = await serviceGqlFetcher(
      GET_ALL_ENHANCED_PRODUCTS_FOR_SELECTOR_QUERY,
      { input: { filters: { enabled: { equals: true }, name: { contains: query } }, take: 30 } },
      { tags: [ProductService.Tags.products_for_selector] }
    );

    return result.products.items.map(product =>
      getFragmentData(COMMON_ENHANCED_PRODUCT_FOR_SELECTOR, product)
    );
  },

  /**
   * @description
   * Get all products by variant ids.
   */
  async getDiscountApplicableProductsByVariantIds(variantIds: ID[], input?: ProductListInput) {
    const { productsByVariantIds } = await serviceGqlFetcher(
      GET_DISCOUNT_APPLICABLE_PRODUCTS_QUERY,
      { ids: variantIds, input },
      { tags: [ProductService.Tags.products_for_selector] }
    );

    return productsByVariantIds.items.map(product =>
      getFragmentData(COMMON_DISCOUNT_APPLICABLE_PRODUCT_FRAGMENT, product)
    );
  },

  async getById(id: string) {
    const result = await serviceGqlFetcher(
      GET_PRODUCT_BY_ID_QUERY,
      { id },
      { tags: [ProductService.Tags.product(id)] }
    );
    const data = getFragmentData(COMMON_PRODUCT_FRAGMENT, result.product);

    return data;
  },

  async create(input: CreateProductInput) {
    const { createProduct } = await serviceGqlFetcher(CREATE_PRODUCT_MUTATION, { input });

    return createProduct;
  },

  async update(id: string, input: UpdateProductInput) {
    const { updateProduct } = await serviceGqlFetcher(UPDATE_PRODUCT_MUTATION, { id, input });

    return updateProduct;
  },

  async massiveRemove(ids: string[]) {
    const { softRemoveProduct } = await serviceGqlFetcher(REMOVE_PRODUCT_MUTATION, { ids });

    return softRemoveProduct;
  }
};
