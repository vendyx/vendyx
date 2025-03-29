import { useCallback, useState } from 'react';

import { restFetcher } from '@/api/fetchers/rest-fetcher';
import { type CommonDiscountApplicableProductFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils/internal-api-response';
import { PAGINATION_PAGE_SIZE } from '@/shared/hooks/use-pagination';

export const useDiscountApplicableProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<CommonDiscountApplicableProductFragment[]>([]);

  const fetchProducts = useCallback(async (page: number, search: string) => {
    setIsLoading(true);

    const searchParams = new URLSearchParams({
      page: page.toString(),
      size: PAGINATION_PAGE_SIZE.toString(),
      search,
      variantIds: JSON.stringify([])
    });

    const { data: products } = await restFetcher<InternalApiProducts>(
      '/product/discount-applicable-products',
      {
        queryParams: searchParams,
        internal: true,
        tags: ['discount-applicable-products', 'discount-id']
      }
    );

    setProducts(products);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    fetchProducts,
    products
  };
};

type InternalApiProducts = InternalApiResponse<CommonDiscountApplicableProductFragment[]>;
