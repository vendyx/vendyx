import {
  COMMON_COLLECTION_FRAGMENT,
  COMMON_COLLECTION_PRODUCT_FRAGMENT,
  CREATE_COLLECTION_MUTATION,
  GET_ALL_COLLECTION_PRODUCTS_QUERY,
  GET_ALL_COLLECTIONS_QUERY,
  GET_COLLECTION_BY_ID_QUERY,
  REMOVE_COLLECTION_MUTATION,
  UPDATE_COLLECTION_MUTATION
} from '../operations/collection.operations';
import { type ID } from '../scalars/scalars.type';
import {
  type CollectionListInput,
  type CreateCollectionInput,
  getFragmentData,
  type ProductListInput,
  type UpdateCollectionInput
} from '../types';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const CollectionService = {
  Tags: {
    collections: 'collections',
    collection: (id: ID) => `collection-${id}`,
    collectionProducts: (id: ID) => `collection-products-${id}`
  },

  async getAll(input?: CollectionListInput) {
    const { collections } = await serviceGqlFetcher(
      GET_ALL_COLLECTIONS_QUERY,
      { input },
      { tags: [CollectionService.Tags.collections] }
    );

    return collections;
  },

  async getById(id: ID) {
    const result = await serviceGqlFetcher(
      GET_COLLECTION_BY_ID_QUERY,
      { id },
      { tags: [CollectionService.Tags.collection(id)] }
    );

    const collection = getFragmentData(COMMON_COLLECTION_FRAGMENT, result.collection);

    return collection;
  },

  async getProducts(collectionId: ID, input: ProductListInput) {
    const result = await serviceGqlFetcher(
      GET_ALL_COLLECTION_PRODUCTS_QUERY,
      { id: collectionId, input },
      { tags: [CollectionService.Tags.collectionProducts(collectionId)] }
    );

    const products = result.collection?.products.items.map(product =>
      getFragmentData(COMMON_COLLECTION_PRODUCT_FRAGMENT, product)
    );

    return products ?? [];
  },

  async create(input: CreateCollectionInput) {
    const { createCollection } = await serviceGqlFetcher(CREATE_COLLECTION_MUTATION, { input });

    return createCollection;
  },

  async update(id: ID, input: UpdateCollectionInput) {
    const { updateCollection } = await serviceGqlFetcher(UPDATE_COLLECTION_MUTATION, { id, input });

    return updateCollection;
  },

  async remove(ids: ID[]) {
    const { removeCollection } = await serviceGqlFetcher(REMOVE_COLLECTION_MUTATION, { ids });

    return removeCollection;
  }
};
