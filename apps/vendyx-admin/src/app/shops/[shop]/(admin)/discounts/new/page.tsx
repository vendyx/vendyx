import { CountryService } from '@/api/services/country.service';
import { DiscountType } from '@/api/types';
import { DiscountDetailsForm } from '@/core/discount/components/discount-details-form/discount-details-form';

export default async function NewDiscountPage({ searchParams }: Props) {
  const discountType = searchParams.type;

  const countries =
    discountType === DiscountType.Shipping ? await CountryService.getAllForSelector() : [];

  return <DiscountDetailsForm type={discountType} countries={countries} />;
}

type Props = {
  searchParams: {
    type: DiscountType;
  };
};
