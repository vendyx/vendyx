import { useEffect, useMemo, useState } from 'react';

import { restFetcher } from '@/api/fetchers/rest-fetcher';
import { type CommonTagFragment } from '@/api/types';
import { type InternalApiResponse } from '@/api/utils/internal-api-response';

export const useProductTags = () => {
  const [allTags, setAllTags] = useState<CommonTagFragment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);

      const { data: tags } = await restFetcher<InternalApiProducts>('/tag', {
        internal: true,
        tags: ['client-tags']
      });

      setAllTags(tags);
      setIsLoading(false);
    })();
  }, []);

  return {
    isLoading,
    allTags
  };
};

type InternalApiProducts = InternalApiResponse<CommonTagFragment[]>;
