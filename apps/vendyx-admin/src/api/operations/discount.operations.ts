import { graphql } from '../codegen';

export const COMMON_DISCOUNT_FRAGMENT = graphql(`
  fragment CommonDiscount on Discount {
    id
    createdAt
    handle
    applicationMode
    availableCombinations
    discountValueType
    discountValue
    enabled
    startsAt
    endsAt
    orderRequirementType
    orderRequirementValue
    perCustomerLimit
    type
    metadata
  }
`);

export const GET_ALL_DISCOUNTS_QUERY = graphql(`
  query GetAllDiscounts($input: DiscountListInput) {
    discounts(input: $input) {
      pageInfo {
        total
      }
      count
      items {
        id
        handle
        applicationMode
        discountValueType
        discountValue
        enabled
        startsAt
        endsAt
        type
        metadata
      }
    }
  }
`);

export const GET_DISCOUNT_BY_ID_QUERY = graphql(`
  query GetDiscount($id: ID!) {
    discount(id: $id) {
      ...CommonDiscount
    }
  }
`);

export const CREATE_DISCOUNT_MUTATION = graphql(`
  mutation CreateDiscount($input: CreateDiscountInput!) {
    createDiscount(input: $input) {
      apiErrors {
        code
        message
      }
      discount {
        id
      }
    }
  }
`);

export const UPDATE_DISCOUNT_MUTATION = graphql(`
  mutation UpdateDiscount($id: ID!, $input: UpdateDiscountInput!) {
    updateDiscount(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      discount {
        id
      }
    }
  }
`);

export const REMOVE_DISCOUNT_MUTATION = graphql(`
  mutation RemoveDiscount($ids: [ID!]!) {
    removeDiscounts(ids: $ids)
  }
`);
