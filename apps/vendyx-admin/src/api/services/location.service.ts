import { getLocationError } from '../errors/location.errors';
import {
  COMMON_IN_STORE_PICKUP_FRAGMENT,
  COMMON_LOCATION_FRAGMENT,
  CREATE_LOCATION_MUTATION,
  GET_ALL_LOCATION_NAMES_QUERY,
  GET_ALL_LOCATIONS_FOR_PICKUP_IN_STORE_LIST_QUERY,
  GET_ALL_LOCATIONS_QUERY,
  GET_IN_PICKUP_PREFERENCES_QUERY,
  GET_LOCATION_BY_ID_QUERY,
  REMOVE_LOCATION_MUTATION,
  UPDATE_IN_STORE_PICKUP_PREFERENCE_MUTATION,
  UPDATE_LOCATION_MUTATION
} from '../operations/location.operations';
import { type ID } from '../scalars/scalars.type';
import {
  type CreateLocationInput,
  getFragmentData,
  type LocationErrorCode,
  type LocationListInput,
  type UpdateInStorePickupPreferencesInput,
  type UpdateLocationInput
} from '../types';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export class LocationService {
  static Tags = {
    locations: 'locations',
    locationNames: 'location-names',
    inStorePickupList: 'in-store-pickup-list',
    location: (id: string) => `location-${id}`,
    inStorePickup: (id: string) => `in-store-pickup-${id}`
  };

  static async getAll(input?: LocationListInput) {
    const { locations } = await serviceGqlFetcher(
      GET_ALL_LOCATIONS_QUERY,
      { input },
      { tags: [LocationService.Tags.locations] }
    );

    return locations.items;
  }

  static async getAllForPickupInStoreList() {
    const { locations } = await serviceGqlFetcher(
      GET_ALL_LOCATIONS_FOR_PICKUP_IN_STORE_LIST_QUERY,
      {},
      { tags: [LocationService.Tags.locations] }
    );

    return locations.items;
  }

  static async getAllNames() {
    const { locations } = await serviceGqlFetcher(
      GET_ALL_LOCATION_NAMES_QUERY,
      {},
      { tags: [LocationService.Tags.locationNames] }
    );

    return locations.items;
  }

  static async getById(id: ID) {
    const result = await serviceGqlFetcher(
      GET_LOCATION_BY_ID_QUERY,
      { id },
      { tags: [LocationService.Tags.location(id)] }
    );

    const location = getFragmentData(COMMON_LOCATION_FRAGMENT, result.location);

    return location;
  }

  static async getInStorePickup(locationId: ID) {
    const result = await serviceGqlFetcher(
      GET_IN_PICKUP_PREFERENCES_QUERY,
      { locationId },
      { tags: [LocationService.Tags.location(locationId)] }
    );

    const inStorePickup = getFragmentData(
      COMMON_IN_STORE_PICKUP_FRAGMENT,
      result.location.inStorePickup
    );

    return inStorePickup;
  }

  static async create(input: CreateLocationInput): Promise<Result> {
    const {
      createLocation: { apiErrors, location }
    } = await serviceGqlFetcher(CREATE_LOCATION_MUTATION, { input });

    const error = getLocationError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, locationId: location?.id ?? '' };
  }

  static async update(id: ID, input: UpdateLocationInput): Promise<Result> {
    const {
      updateLocation: { apiErrors, location }
    } = await serviceGqlFetcher(UPDATE_LOCATION_MUTATION, { id, input });

    const error = getLocationError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, locationId: location?.id ?? '' };
  }

  static async remove(id: ID): Promise<Result> {
    const {
      removeLocation: { apiErrors }
    } = await serviceGqlFetcher(REMOVE_LOCATION_MUTATION, { id });

    const error = getLocationError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, locationId: id };
  }

  static async updateInStorePickupPreferences(
    locationId: ID,
    input: UpdateInStorePickupPreferencesInput
  ) {
    const {
      updateInStorePickupPreferences: { apiErrors, location }
    } = await serviceGqlFetcher(UPDATE_IN_STORE_PICKUP_PREFERENCE_MUTATION, {
      locationId,
      input
    });

    const error = getLocationError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, locationId: location?.id ?? '' };
  }
}

type Result =
  | {
      success: true;
      locationId: ID;
    }
  | {
      success: false;
      error: string;
      errorCode: LocationErrorCode;
    };
