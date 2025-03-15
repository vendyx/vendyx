import { useCallback, useState } from 'react';

import { restFetcher } from '@/api/fetchers/rest-fetcher';
import { type ID } from '@/api/scalars/scalars.type';
import { type CommonCollectionSubCollectionFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils/internal-api-response';
import { PAGINATION_PAGE_SIZE } from '@/shared/hooks/use-pagination';

export const useCollectionSubCollectionsTable = (collectionId: ID) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subCollections, setSubCollections] = useState<CommonCollectionSubCollectionFragment[]>([]);

  const fetchSubCollections = useCallback(async (page: number, search: string) => {
    setIsLoading(true);

    const searchParams = new URLSearchParams({
      page: page.toString(),
      size: PAGINATION_PAGE_SIZE.toString(),
      search,
      collectionId
    });

    const { data: subCollections } = await restFetcher<InternalApiProducts>(
      '/collection/sub-collections',
      {
        queryParams: searchParams,
        internal: true,
        tags: ['client-collection-sub-collections', collectionId]
      }
    );

    setSubCollections(subCollections);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    fetchSubCollections,
    subCollections
  };
};

type InternalApiProducts = InternalApiResponse<CommonCollectionSubCollectionFragment[]>;
