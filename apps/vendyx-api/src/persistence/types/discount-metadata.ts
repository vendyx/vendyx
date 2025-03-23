import { DiscountType } from '@prisma/client';

import { ID } from './scalars.type';

export type ProductDiscountMetadata = {
  variants: ID[];
};

export type ShippingDiscountMetadata = {
  countries: ID[];
  allCountries: boolean;
};

export type BuyXGetYDiscountMetadata = {
  buy: {
    variants: ID[];
    requirement: BuyXGetYDiscountMetadataRequirement;
    requirementValue: number;
  };
  get: { variants: ID[]; quantity: number };
};

export enum BuyXGetYDiscountMetadataRequirement {
  MIN_QUANTITY = 'MIN_QUANTITY',
  MIN_AMOUNT = 'MIN_AMOUNT'
}

export type OrderDiscount = {
  id: ID;
  handler: string;
  type: DiscountType;
};
