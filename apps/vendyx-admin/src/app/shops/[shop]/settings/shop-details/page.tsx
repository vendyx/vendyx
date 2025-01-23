import { notFound } from 'next/navigation';

import { ShopService } from '@/api/services/shop.service';
import { ShopDetailsForm } from '@/core/shop/components/shop-details/shop-details-form';

export default async function StoreDetailsPage({ params }: { params: Params }) {
  const shop = await ShopService.getBySlug(params.shop);

  if (!shop) {
    notFound();
  }

  return <ShopDetailsForm shop={shop} />;
}

type Params = {
  shop: string;
};
