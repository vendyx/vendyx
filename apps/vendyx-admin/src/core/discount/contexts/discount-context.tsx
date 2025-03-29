import { type PropsWithChildren } from 'react';

import { type CommonDiscountFragment, type DiscountType } from '@/api/types';
import { EntityProvider, useEntityContext } from '@/shared/contexts/entity-context';

export type DiscountContext = {
  type: DiscountType;
  discount: CommonDiscountFragment | undefined;
  isCreating: boolean;
};

export const useDiscountContext = () => {
  const { entity } = useEntityContext<DiscountContext>();
  return entity;
};

export const DiscountContextProvider = ({
  children,
  value
}: { value: DiscountContext } & PropsWithChildren) => {
  return <EntityProvider entity={value}>{children}</EntityProvider>;
};
