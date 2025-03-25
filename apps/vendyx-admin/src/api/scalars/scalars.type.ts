import { type DiscountType } from '../types';

export type ID = string;
export type Metadata = {
  key: string;
  label: string;
  type: 'text' | 'price';
};

export type Args<K extends string = string> = Record<K, Arg>;

export type Arg =
  | {
      type: 'text';
      required: boolean;
      label?: string;
      defaultValue?: string;
      placeholder?: string;
      conditions?: { min: number; max: number };
    }
  | {
      type: 'number';
      required: boolean;
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions?: { min: number; max: number };
    }
  | {
      type: 'boolean';
      required: boolean;
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: 'select';
      required: boolean;
      label?: string;
      defaultValue?: string;
      options: { label: string; value: string }[];
    }
  | {
      type: 'checkbox';
      required: boolean;
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: 'price';
      required: boolean;
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions: { min: number; max: number };
    };

export type MetricRange = {
  startsAt: Date;
  endsAt: Date;
};

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
