import { graphql } from '../codegen';

export const COMMON_CUSTOMER_FRAGMENT = graphql(`
  fragment CommonCustomer on Customer {
    id
    createdAt
    firstName
    lastName
    email
    phoneNumber
    enabled
    totalSpent
    orders {
      count
    }
  }
`);

export const COMMON_CUSTOMER_ORDER_FRAGMENT = graphql(`
  fragment CommonCustomerOrder on Order {
    id
    code
    placedAt
    state
    total
    shipment {
      method
      type
      metadata
    }
  }
`);

export const GET_ALL_CUSTOMERS_QUERY = graphql(`
  query GetAllCustomersQuery($input: CustomerListInput) {
    customers(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        id
        firstName
        lastName
        email
        enabled
        totalSpent
        orders {
          count
        }
      }
    }
  }
`);

export const GET_ALL_CUSTOMER_ORDERS_QUERY = graphql(`
  query GetAllCustomerOrdersQuery($id: ID!, $input: OrderListInput) {
    customer(id: $id) {
      orders(input: $input) {
        count
        items {
          ...CommonCustomerOrder
        }
      }
    }
  }
`);

export const GET_CUSTOMER_BY_ID_QUERY = graphql(`
  query GetCustomerByIdQuery($id: ID!) {
    customer(id: $id) {
      ...CommonCustomer
    }
  }
`);

export const UPDATE_CUSTOMER_MUTATION = graphql(`
  mutation UpdateCustomerMutation($customerId: ID!, $input: UpdateCustomerInput!) {
    updateCustomer(id: $customerId, input: $input) {
      apiErrors {
        code
        message
      }
      customer {
        id
      }
    }
  }
`);
