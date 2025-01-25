import { graphql } from '../codegen';

export const COMMON_COLLECTION_FRAGMENT = graphql(`
  fragment CommonCollection on Collection {
    id
    name
    description
    enabled
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
        assets(input: { take: 1 }) {
          items {
            id
            source
          }
        }
        products {
          count
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
