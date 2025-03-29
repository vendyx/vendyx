import { ItemsTable } from '@/shared/components/items-table/items-table';
import { useBase } from '@/shared/hooks/use-base';

import { useDiscountContext } from '../../contexts/discount-context';
import { getVariantsInMetadata } from '../../utils/discount-products.utils';
import {
  type InMemoryProductDiscountMetadata,
  useDiscountDetailsFormContext
} from '../discount-details-form/use-discount-details-form';
import { DiscountProductSelector } from '../discount-product-selector/discount-product-selector';
import { DiscountApplicableProductsTableRow } from './discount-applicable-products-row/discount-applicable-products-table-row';
import { useDiscountApplicableProducts } from './use-discount-applicable-products-table';

export const DiscountApplicableProductsTable = () => {
  const base = useBase();
  const { discount, isCreating } = useDiscountContext();
  const { watch } = useDiscountDetailsFormContext();
  const { products, isLoading, fetchProducts } = useDiscountApplicableProducts();

  const metadata = watch('metadata') as unknown;

  // Products selected while creating the discount
  const selectedProducts =
    (metadata as InMemoryProductDiscountMetadata).inMemoryProductsSelected ?? [];

  return (
    <ItemsTable
      hideMutators={!discount}
      title="Products"
      headers={['Product', '']}
      items={[...selectedProducts, ...products]}
      isLoading={isLoading}
      onChange={async (page, search) => await fetchProducts(page, search)}
      renderRow={product => (
        <DiscountApplicableProductsTableRow key={product.id} product={product} base={base} />
      )}
      action={
        <DiscountProductSelector
          defaultVariants={[...getVariantsInMetadata(metadata, isCreating)]}
        />
      }
    />
  );
};
