import { type NextRequest } from 'next/server';

import { CollectionService } from '@/api/services/collection.service';
import { InternalApiResponse } from '@/api/utils/internal-api-response';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? '';

  const result = await CollectionService.getSubCollectionsForSelector(search);

  return Response.json(new InternalApiResponse(result));
};
