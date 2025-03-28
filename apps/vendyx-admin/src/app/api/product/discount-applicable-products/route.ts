import { type NextRequest } from 'next/server';

import { ProductService } from '@/api/services/product.service';
import { InternalApiResponse } from '@/api/utils/internal-api-response';
import { getSkip } from '@/shared/components/data-table/data-table-utils';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const variantIds = searchParams.get('variantIds') as unknown as string[];
  const page = Number(searchParams.get('page'));
  const size = Number(searchParams.get('size'));
  const search = searchParams.get('search');

  const result = await ProductService.getDiscountApplicableProductsByVariantIds(variantIds, {
    skip: getSkip(page, size),
    take: size,
    filters: {
      enabled: { equals: true },
      name: { contains: search }
    }
  });

  return Response.json(new InternalApiResponse(result));
};
