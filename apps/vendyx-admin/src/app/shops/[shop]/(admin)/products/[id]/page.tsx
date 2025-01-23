import { notFound } from 'next/navigation';

import { ProductService } from '@/api/services/product.service';
import { ProductDetailsForm } from '@/core/product/components/product-details/product-details-form';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await ProductService.getById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsForm product={product} />;
}
