import { type FC } from 'react';

import { ProductService } from '@/api/services/product.service';
import {
  type DataTableSearchParams,
  getSkip,
  parseDataTableSearchParams
} from '@/shared/components/data-table/data-table-utils';
import { DataTableEmptyState } from '@/shared/components/empty-states/data-table-empty-state';

import ProductTableData from './product-table-data';

export const ProductTable: FC<Props> = async props => {
  const { page, search, size } = parseDataTableSearchParams({ ...props });

  const { items: products, pageInfo } = await ProductService.getAll({
    skip: getSkip(page, size),
    take: size,
    filters: { name: { contains: search } }
  });

  if (!products.length && !search) {
    return (
      <DataTableEmptyState
        title="You have no products"
        description="You can start selling as soon as you add a product."
        action={{ label: 'Add product', to: '/products/new' }}
      />
    );
  }

  const data: ProductsTableRow[] =
    products?.map(p => {
      const totalStock = p.variants.items.reduce((acc, v) => acc + v.stock, 0);
      const image = p.assets.items[0]?.source;

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        status: p.enabled,
        image,
        stock: totalStock,
        totalVariants: p.variants.items.length
      };
    }) ?? [];

  return (
    <ProductTableData data={data} pagination={{ page, search, size }} totalRows={pageInfo.total} />
  );
};

export type ProductsTableRow = {
  id: string;
  image: string;
  name: string;
  slug: string;
  stock: number;
  totalVariants: number;
  status: boolean;
};

type Props = DataTableSearchParams;
