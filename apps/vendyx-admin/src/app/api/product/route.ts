import { type NextRequest } from 'next/server';

import { ProductService } from '@/api/services/product.service';
import { InternalApiResponse } from '@/api/utils/internal-api-response';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') ?? '';
  const enhanced = searchParams.get('enhanced') === 'true';

  let result;

  if (enhanced) {
    result = await ProductService.getAllEnhancedForSelector(search);
  } else {
    result = await ProductService.getAllForSelector(search);
  }

  return Response.json(new InternalApiResponse(result));
};
