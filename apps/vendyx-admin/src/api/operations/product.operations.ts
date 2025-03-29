import { graphql } from '../codegen';

export const COMMON_PRODUCT_FRAGMENT = graphql(`
  fragment CommonProduct on Product {
    id
    createdAt
    name
    description
    enabled
    variants {
      items {
        id
        salePrice
        sku
        stock
        comparisonPrice
        costPerUnit
        requiresShipping
        optionValues {
          id
          name
        }
        asset {
          id
          source
        }
      }
    }
    options {
      id
      name
      values {
        id
        name
      }
    }
    assets {
      items {
        id
        name
        source
        order
      }
    }
  }
`);

export const COMMON_PRODUCT_FOR_SELECTOR = graphql(`
  fragment CommonProductForSelector on Product {
    id
    name
    assets(input: { take: 1 }) {
      items {
        id
        source
      }
    }
  }
`);

export const COMMON_ENHANCED_PRODUCT_FOR_SELECTOR = graphql(`
  fragment CommonEnhancedProductForSelector on Product {
    id
    name
    variants {
      items {
        id
        optionValues {
          id
          name
        }
      }
    }
    assets(input: { take: 1 }) {
      items {
        id
        source
      }
    }
  }
`);

export const COMMON_DISCOUNT_APPLICABLE_PRODUCT_FRAGMENT = graphql(`
  fragment CommonDiscountApplicableProduct on Product {
    id
    name
    slug
    assets(input: { take: 1 }) {
      items {
        id
        source
      }
    }
    variants {
      items {
        id
        optionValues {
          id
          name
        }
      }
    }
  }
`);

export const GET_ALL_PRODUCTS_QUERY = graphql(`
  query GetProducts($input: ProductListInput) {
    products(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        id
        createdAt
        name
        slug
        enabled
        variants {
          items {
            id
            sku
            stock
            salePrice
          }
        }
        assets(input: { take: 1 }) {
          items {
            id
            source
          }
        }
      }
    }
  }
`);

export const GET_ALL_PRODUCTS_FOR_SELECTOR_QUERY = graphql(`
  query GetProductsForSelector($input: ProductListInput) {
    products(input: $input) {
      items {
        ...CommonProductForSelector
      }
    }
  }
`);

export const GET_ALL_ENHANCED_PRODUCTS_FOR_SELECTOR_QUERY = graphql(`
  query GetAllEnhancedProductsForSelector($input: ProductListInput) {
    products(input: $input) {
      items {
        ...CommonEnhancedProductForSelector
      }
    }
  }
`);

export const GET_DISCOUNT_APPLICABLE_PRODUCTS_QUERY = graphql(`
  query GetDiscountApplicableProductsQuery($ids: [ID!]!) {
    productsByVariantIds(ids: $ids) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonDiscountApplicableProduct
      }
    }
  }
`);

export const GET_PRODUCT_BY_ID_QUERY = graphql(`
  query GetProduct($id: ID) {
    product(id: $id) {
      ...CommonProduct
    }
  }
`);

export const CREATE_PRODUCT_MUTATION = graphql(`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`);

export const UPDATE_PRODUCT_MUTATION = graphql(`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_PRODUCT_MUTATION = graphql(`
  mutation RemoveProduct($ids: [ID!]!) {
    softRemoveProduct(ids: $ids)
  }
`);
