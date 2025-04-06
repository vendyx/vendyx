import { type NextRequest } from 'next/server';

import { TagService } from '@/api/services/tag.service';
import { InternalApiResponse } from '@/api/utils/internal-api-response';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('search') ?? '';

  const result = await TagService.getAll({ filters: { name: { contains: search } } });

  return Response.json(new InternalApiResponse(result));
};
