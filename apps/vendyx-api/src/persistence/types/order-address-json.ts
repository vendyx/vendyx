import { AddressJson } from '@/api/shared/types/gql.types';

import { ID } from './scalars.type';

export type OrderAddressJson = AddressJson & { countryId: ID };
