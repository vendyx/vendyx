import { notFound } from 'next/navigation';

import { DiscountService } from '@/api/services/discount.service';
import { DiscountDetailsForm } from '@/core/discount/components/discount-details-form/discount-details-form';

export default async function NewDiscountPage({ params }: Props) {
  const discount = await DiscountService.getById(params.id);

  if (!discount) {
    return notFound();
  }

  return <DiscountDetailsForm type={discount.type} discount={discount} />;
}

type Props = {
  params: {
    id: string;
  };
};
