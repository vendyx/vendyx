import { graphql } from '../codegen';

export const GET_ALL_DISCOUNTS_QUERY = graphql(`
  query GetAllDiscounts($input: DiscountListInput) {
    discounts(input: $input) {
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
      }
    }
  }
`);
