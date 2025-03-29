import { type CommonDiscountFragment, type DiscountType } from '@/api/types';
import { useEntityContext } from '@/shared/contexts/entity-context';

export type DiscountContext = {
  type: DiscountType;
  discount: CommonDiscountFragment;
};

export const useDiscountContext = () => {
  const { entity } = useEntityContext<DiscountContext>();
  return entity;
};
