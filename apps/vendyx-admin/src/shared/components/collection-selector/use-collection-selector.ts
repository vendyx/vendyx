import { useEffect, useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

import { restFetcher } from '@/api/fetchers/rest-fetcher';
import { type CommonSubCollectionForSelectorFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils/internal-api-response';

export const useCollectionSelector = () => {
  const [collections, setCollections] = useState<CommonSubCollectionForSelectorFragment[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [refetch, setRefetch] = useState(0);
  const [search, setSearch] = useState('');

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
  }, 300);

  useEffect(() => {
    void (async () => {
      setIsFetching(true);

      const searchParams = new URLSearchParams({
        search
      });

      const result = await restFetcher<InternalApiSubCollectionsForSelector>('/collection', {
        queryParams: searchParams,
        tags: ['collections-for-selector'],
        internal: true
      });

      setCollections(result.data);
      setIsFetching(false);
    })();
  }, [search, refetch]);

  return {
    isFetching,
    handleSearch,
    collections,
    refetch: () => setRefetch(refetch + 1)
  };
};

type InternalApiSubCollectionsForSelector = InternalApiResponse<
  CommonSubCollectionForSelectorFragment[]
>;
