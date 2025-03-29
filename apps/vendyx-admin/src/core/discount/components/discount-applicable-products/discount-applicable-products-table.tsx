import { ItemsTable } from '@/shared/components/items-table/items-table';
import { useBase } from '@/shared/hooks/use-base';

import { DiscountApplicableProductsTableRow } from './discount-applicable-products-table-row';
import { useDiscountApplicableProducts } from './use-discount-applicable-products-table';

export const DiscountApplicableProductsTable = () => {
  const base = useBase();
  const { products, isLoading, fetchProducts } = useDiscountApplicableProducts();

  return (
    <ItemsTable
      title="Products"
      headers={['Product', 'Status']}
      items={products}
      isLoading={isLoading}
      onChange={async (page, search) => await fetchProducts(page, search)}
      renderRow={product => (
        <DiscountApplicableProductsTableRow key={product.id} product={product} base={base} />
      )}
    />
  );
};
