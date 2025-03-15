import { graphql } from '../codegen';

export const COMMON_COLLECTION_FRAGMENT = graphql(`
  fragment CommonCollection on Collection {
    id
    name
    description
    enabled
    contentType
    products {
      items {
        id
      }
    }
    assets(input: { take: 1 }) {
      items {
        id
        name
        source
      }
    }
  }
`);

export const COMMON_COLLECTION_PRODUCT_FRAGMENT = graphql(`
  fragment CommonCollectionProduct on Product {
    id
    name
    slug
    enabled
  }
`);

export const COMMON_COLLECTION_SUB_COLLECTION_FRAGMENT = graphql(`
  fragment CommonCollectionSubCollection on Collection {
    id
    name
    products {
      count
    }
    enabled
  }
`);

export const COMMON_SUB_COLLECTION_FOR_SELECTOR_FRAGMENT = graphql(`
  fragment CommonSubCollectionForSelector on Collection {
    id
    name
  }
`);

export const GET_ALL_COLLECTIONS_QUERY = graphql(`
  query GetAllCollections($input: CollectionListInput) {
    collections(input: $input) {
      pageInfo {
        total
      }
      items {
        id
        name
        slug
        enabled
        contentType
        assets(input: { take: 1 }) {
          items {
            id
            source
          }
        }
        subCollections(input: { take: 8 }) {
          count
          items {
            id
            name
          }
        }
        products {
          count
          items {
            id
            name
          }
        }
      }
    }
  }
`);

export const GET_COLLECTION_BY_ID_QUERY = graphql(`
  query GetCollection($id: ID) {
    collection(id: $id) {
      ...CommonCollection
    }
  }
`);

export const GET_ALL_COLLECTION_PRODUCTS_QUERY = graphql(`
  query GetCollectionProducts($id: ID, $input: ProductListInput) {
    collection(id: $id) {
      products(input: $input) {
        count
        items {
          ...CommonCollectionProduct
        }
      }
    }
  }
`);

export const GET_ALL_COLLECTION_SUB_COLLECTIONS_QUERY = graphql(`
  query GetCollectionSubCollections($id: ID, $input: CollectionListInput) {
    collection(id: $id) {
      subCollections(input: $input) {
        count
        items {
          ...CommonCollectionSubCollection
        }
      }
    }
  }
`);

export const GET_ALL_SUB_COLLECTIONS_FOR_SELECTOR_QUERY = graphql(`
  query GetAllSubCollectionsForSelector($input: CollectionListInput) {
    collections(input: $input) {
      items {
        ...CommonSubCollectionForSelector
      }
    }
  }
`);

export const CREATE_COLLECTION_MUTATION = graphql(`
  mutation CreateCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      id
    }
  }
`);

export const UPDATE_COLLECTION_MUTATION = graphql(`
  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {
    updateCollection(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_COLLECTION_MUTATION = graphql(`
  mutation RemoveCollection($ids: [ID!]!) {
    removeCollection(ids: $ids)
  }
`);
