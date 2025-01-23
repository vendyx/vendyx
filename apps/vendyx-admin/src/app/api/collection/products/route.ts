import { type NextRequest } from 'next/server';

import { CollectionService } from '@/api/services/collection.service';
import { InternalApiResponse } from '@/api/utils/internal-api-response';
import { getSkip } from '@/shared/components/data-table/data-table-utils';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const collectionId = searchParams.get('collectionId');
  const page = Number(searchParams.get('page'));
  const size = Number(searchParams.get('size'));
  const search = searchParams.get('search');

  const result = await CollectionService.getProducts(collectionId ?? '', {
    skip: getSkip(page, size),
    take: size,
    filters: {
      name: { contains: search }
    }
  });

  return Response.json(new InternalApiResponse(result));
};
