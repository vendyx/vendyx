import { graphql } from '../codegen';

export const COMMON_LOCATION_FRAGMENT = graphql(`
  fragment CommonLocation on Location {
    id
    name
    isActive
    isDefault
    streetLine1
    streetLine2
    country
    city
    phoneNumber
    postalCode
    province
    inStorePickup {
      isAvailable
    }
  }
`);

export const COMMON_IN_STORE_PICKUP_FRAGMENT = graphql(`
  fragment CommonInStorePickup on InStorePickup {
    isAvailable
    instructions
  }
`);

export const GET_ALL_LOCATIONS_QUERY = graphql(`
  query GetAllLocationsQuery($input: LocationListInput) {
    locations(input: $input) {
      items {
        id
        name
        isActive
        streetLine1
        country
        city
        province
      }
    }
  }
`);

export const GET_LOCATION_BY_ID_QUERY = graphql(`
  query GetLocationByIdQuery($id: ID!) {
    location(id: $id) {
      ...CommonLocation
    }
  }
`);

export const GET_IN_PICKUP_PREFERENCES_QUERY = graphql(`
  query GetInStorePickupPreferencesQuery($locationId: ID!) {
    location(id: $locationId) {
      id
      inStorePickup {
        ...CommonInStorePickup
      }
    }
  }
`);

export const CREATE_LOCATION_MUTATION = graphql(`
  mutation CreateLocationMutation($input: CreateLocationInput!) {
    createLocation(input: $input) {
      apiErrors {
        code
        message
      }
      location {
        id
      }
    }
  }
`);

export const UPDATE_LOCATION_MUTATION = graphql(`
  mutation UpdateLocationMutation($id: ID!, $input: UpdateLocationInput!) {
    updateLocation(id: $id, input: $input) {
      apiErrors {
        code
        message
      }
      location {
        id
      }
    }
  }
`);

export const REMOVE_LOCATION_MUTATION = graphql(`
  mutation RemoveLocationMutation($id: ID!) {
    removeLocation(id: $id) {
      apiErrors {
        code
        message
      }
      success
    }
  }
`);

export const UPDATE_IN_STORE_PICKUP_PREFERENCE_MUTATION = graphql(`
  mutation UpdateInStorePickupPreferencesMutation(
    $locationId: ID!
    $input: updateInStorePickupPreferencesInput!
  ) {
    updateInStorePickupPreferences(locationId: $locationId, input: $input) {
      apiErrors {
        code
        message
      }
      location {
        id
      }
    }
  }
`);
