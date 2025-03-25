import { type FC, type PropsWithChildren } from 'react';

import {
  type BuyXGetYDiscountMetadata,
  BuyXGetYDiscountMetadataRequirement,
  type ProductDiscountMetadata
} from '@/api/scalars/scalars.type';
import { DiscountType, DiscountValueType } from '@/api/types';
import { formatPrice } from '@/shared/utils/formatters';

import { type DiscountsTableRow } from './discounts-table';

export const DiscountDescription: FC<Props> = ({ discount }) => {
  const isPercentage = discount.discountValueType === DiscountValueType.Percentage;
  const discountValue = isPercentage
    ? `${discount.discountValue}%`
    : formatPrice(discount.discountValue);

  if (discount.type === DiscountType.Order) {
    return <Description>{discountValue} off for order</Description>;
  }

  if (discount.type === DiscountType.Product) {
    const metadata = discount.metadata as ProductDiscountMetadata;
    const applicableVariants = metadata.variants;

    return (
      <Description>
        {discountValue} off for {applicableVariants.length}{' '}
        {applicableVariants.length === 1 ? 'product' : 'products'}
      </Description>
    );
  }

  if (discount.type === DiscountType.Shipping) {
    return <Description>{discountValue} off for shipping</Description>;
  }

  if (discount.type === DiscountType.BuyXGetY) {
    const { buy, get } = discount.metadata as BuyXGetYDiscountMetadata;
    const isMinQuantityRequirement =
      buy.requirement === BuyXGetYDiscountMetadataRequirement.MIN_QUANTITY;

    return (
      <Description>
        {isMinQuantityRequirement
          ? `Buy ${buy.requirementValue} ${buy.requirementValue === 1 ? 'product' : 'products'}`
          : `Spend ${formatPrice(buy.requirementValue)}`}
        , get {get.quantity} at{' '}
        {isPercentage
          ? `${formatPrice(discount.discountValue)} off each`
          : `${discount.discountValue}% off`}
      </Description>
    );
  }
};

type Props = {
  discount: DiscountsTableRow;
};

const Description = ({ children }: PropsWithChildren) => (
  <p className="text-nowrap font-normal text-muted-foreground">{children}</p>
);
