import { restFetcher, type RestFetcherOptions } from '@/api/fetchers/rest-fetcher';
import { getActiveShop, getToken } from '@/shared/cookies/cookies';

/**
 * A fetcher created to work on the server side with services for rest requests
 */
export const serviceRestFetcher = async <R>(url: string, options?: Options) =>
  await restFetcher<R>(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      x_vendyx_shop_id: getActiveShop()?.id ?? '',
      ...options?.headers
    }
  });

type Options = RestFetcherOptions;
