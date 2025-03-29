import { type ID, type ProductDiscountMetadata } from '@/api/scalars/scalars.type';
import { type CommonEnhancedProductForSelectorFragment } from '@/api/types';
import { type THashMap } from '@/shared/utils/types';

import { type InMemoryProductDiscountMetadata } from '../components/discount-details-form/use-discount-details-form';

/**
 * @description
 * Groups given variants by the given products.
 */
export const groupVariantsByProducts = (
  products: CommonEnhancedProductForSelectorFragment[],
  variants: ID[]
) => {
  const result = products.reduce(
    (acc: THashMap<InMemoryProductDiscountMetadata['inMemoryProductsSelected'][0]>, product) => {
      const currVariants = product.variants.items.map(v => v.id);
      const hasSelectedVariants = variants.find(v => currVariants.includes(v));

      if (hasSelectedVariants) {
        acc[product.id] = {
          ...product,
          variants: {
            items: product.variants.items.filter(v => variants.includes(v.id))
          }
        };
      }

      return acc;
    },
    {}
  );

  return Object.values(result);
};

/**
 * @description
 * Returns variant ids from metadata based on the current context (creating or editing).
 * In the creating context, it returns the selected variants from inMemoryProductsSelected.
 * In the editing context, it returns the variants from the metadata.
 */
export const getVariantsInMetadata = (metadata: unknown, isCreating: boolean) => {
  if (isCreating) {
    const products = (metadata as InMemoryProductDiscountMetadata).inMemoryProductsSelected ?? [];
    return products.flatMap(product => product.variants.items.map(v => v.id));
  }

  return (metadata as ProductDiscountMetadata).variants ?? [];
};
