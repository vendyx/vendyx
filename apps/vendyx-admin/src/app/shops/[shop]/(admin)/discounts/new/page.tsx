import { DiscountType } from '@/api/types';

export default function NewDiscountPage({ searchParams }: Props) {
  const discountType = searchParams.type;
  console.log({
    searchParams
  });

  if (discountType === DiscountType.Order) {
    return 'Order discount';
  }

  if (discountType === DiscountType.Product) {
    return 'Product discount';
  }

  if (discountType === DiscountType.Shipping) {
    return 'Shipping discount';
  }

  if (discountType === DiscountType.BuyXGetY) {
    return 'Buy X Get Y discount';
  }

  return 'sopme';
}

type Props = {
  searchParams: {
    type: DiscountType;
  };
};
