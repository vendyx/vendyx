import { ID } from './scalars.type';

import { AddressJson } from '@/api/shared/types/gql.types';

export type OrderAddressJson = AddressJson & { countryId: ID };
