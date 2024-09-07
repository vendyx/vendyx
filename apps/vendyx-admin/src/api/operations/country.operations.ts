import { graphql } from '../codegen';

export const COMMON_COUNTRY_FRAGMENT = graphql(`
  fragment CommonCountry on Country {
    id
    name
    states {
      id
      name
    }
  }
`);

export const GET_ALL_COUNTRIES_QUERY = graphql(`
  query GetCountries {
    countries {
      ...CommonCountry
    }
  }
`);
