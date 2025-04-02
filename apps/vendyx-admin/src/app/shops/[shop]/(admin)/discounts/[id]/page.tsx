import { notFound } from 'next/navigation';

import { CountryService } from '@/api/services/country.service';
import { DiscountService } from '@/api/services/discount.service';
import { DiscountType } from '@/api/types';
import { DiscountDetailsForm } from '@/core/discount/components/discount-details-form/discount-details-form';

export default async function NewDiscountPage({ params }: Props) {
  const discount = await DiscountService.getById(params.id);

  if (!discount) {
    return notFound();
  }

  const countries =
    discount.type === DiscountType.Shipping ? await CountryService.getAllForSelector() : [];

  return <DiscountDetailsForm type={discount.type} discount={discount} countries={countries} />;
}

type Props = {
  params: {
    id: string;
  };
};
