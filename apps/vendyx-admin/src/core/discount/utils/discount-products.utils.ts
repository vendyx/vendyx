import { ID } from '@/api/scalars/scalars.type';
import { CommonEnhancedProductForSelectorFragment } from '@/api/types';
import { THashMap } from '@/shared/utils/types';
import { InMemoryProductDiscountMetadata } from '../components/discount-details-form/use-discount-details-form';

/**
 * @description
 * Groups given variants by the given products.
 */
export const groupVariantsByProducts = (
  products: CommonEnhancedProductForSelectorFragment[],
  variants: ID[]
) => {
  const result = products.reduce(
    (acc: THashMap<InMemoryProductDiscountMetadata['products'][0]>, product) => {
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
