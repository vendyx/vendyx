import { type DiscountType } from '@/api/types';
import { DiscountDetailsForm } from '@/core/discount/components/discount-details-form/discount-details-form';

export default function NewDiscountPage({ searchParams }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const discountType = searchParams.type;

  return <DiscountDetailsForm type={discountType} />;
}

type Props = {
  searchParams: {
    type: DiscountType;
  };
};
