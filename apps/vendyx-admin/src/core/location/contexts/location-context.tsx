import { type PropsWithChildren } from 'react';

import { type CommonCountryFragment } from '@/api/types';
import { EntityProvider, useEntityContext } from '@/shared/contexts/entity-context';

export type LocationContext = {
  countries: CommonCountryFragment[];
};

export const useLocationContext = () => {
  const { entity } = useEntityContext<LocationContext>();
  return entity;
};

export const LocationContextProvider = ({
  children,
  value
}: { value: LocationContext } & PropsWithChildren) => {
  return <EntityProvider entity={value}>{children}</EntityProvider>;
};
