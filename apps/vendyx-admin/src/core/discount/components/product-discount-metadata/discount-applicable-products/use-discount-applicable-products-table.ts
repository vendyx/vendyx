import { useCallback, useEffect, useState } from 'react';

import { restFetcher } from '@/api/fetchers/rest-fetcher';
import { type ProductDiscountMetadata } from '@/api/scalars/scalars.type';
import { type CommonDiscountApplicableProductFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils/internal-api-response';
import { PAGINATION_PAGE_SIZE } from '@/shared/hooks/use-pagination';

import { useDiscountContext } from '../../../contexts/discount-context';

export const useDiscountApplicableProducts = () => {
  const { discount } = useDiscountContext();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<CommonDiscountApplicableProductFragment[]>([]);

  useEffect(() => {
    void (async () => {
      await fetchProducts(1, '');
    })();
  }, [discount]);

  const fetchProducts = useCallback(
    async (page: number, search: string) => {
      setIsLoading(true);
      const metadata = discount?.metadata as ProductDiscountMetadata;

      const searchParams = new URLSearchParams({
        page: page.toString(),
        size: PAGINATION_PAGE_SIZE.toString(),
        search,
        variantIds: JSON.stringify(metadata?.variants ?? [])
      });

      const { data: products } = await restFetcher<InternalApiProducts>(
        '/product/discount-applicable-products',
        {
          queryParams: searchParams,
          internal: true,
          tags: ['discount-applicable-products', discount?.id ?? '']
        }
      );

      setProducts(products);
      setIsLoading(false);
    },
    [discount]
  );

  return {
    isLoading,
    fetchProducts,
    products
  };
};

type InternalApiProducts = InternalApiResponse<CommonDiscountApplicableProductFragment[]>;
