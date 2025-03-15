import { gqlFetcher, type GqlFetcherOptions } from '@/api/fetchers/gql-fetcher';
import { getActiveShop, getToken } from '@/shared/cookies/cookies';

import { type TypedDocumentString } from '../../codegen/graphql';

/**
 * A fetcher creates to work on the server side with services for gql requests
 */
export const serviceGqlFetcher = async <R, V>(
  query: TypedDocumentString<R, V>,
  variables?: V,
  options?: Options
): Promise<R> =>
  await gqlFetcher<R, V>(query, variables, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      x_vendyx_shop_id: getActiveShop()?.id ?? '',
      ...options?.headers
    }
  });

type Options = GqlFetcherOptions;
