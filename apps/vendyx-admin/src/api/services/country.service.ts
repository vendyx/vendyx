import { getFragmentData } from '../codegen';
import {
  COMMON_COUNTRY_FOR_SELECTOR_FRAGMENT,
  COMMON_COUNTRY_FRAGMENT,
  GET_ALL_COUNTRIES_FOR_SELECTOR_QUERY,
  GET_ALL_COUNTRIES_QUERY
} from '../operations/country.operations';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const CountryService = {
  Tags: {
    countries: 'countries'
  },

  async getAll() {
    const result = await serviceGqlFetcher(
      GET_ALL_COUNTRIES_QUERY,
      {},
      { revalidate: Infinity, cache: null }
    );

    const countries = getFragmentData(COMMON_COUNTRY_FRAGMENT, result.countries);

    return countries;
  },

  async getAllForSelector() {
    const result = await serviceGqlFetcher(
      GET_ALL_COUNTRIES_FOR_SELECTOR_QUERY,
      {},
      { revalidate: Infinity, cache: null }
    );

    const countries = result.countries.map(country => {
      return getFragmentData(COMMON_COUNTRY_FOR_SELECTOR_FRAGMENT, country);
    });

    return countries;
  }
};
