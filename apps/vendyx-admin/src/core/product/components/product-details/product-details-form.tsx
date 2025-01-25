'use client';

import { type FC } from 'react';

import { type CommonProductFragment } from '@/api/types';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { Form } from '@/shared/form/form';
import useNewNotification from '@/shared/hooks/use-new-notification';

import { ProductSubmitButton } from '../product-submit-button/product-submit-button';
import { ProductDetails } from './product-details';
import { useProductDetailsForm } from './use-product-details-form';

export const ProductDetailsForm: FC<Props> = ({ product }) => {
  const form = useProductDetailsForm(product);
  useNewNotification('Product created');

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <AdminPageLayout
          title={product ? product.name : 'Create product'}
          maxWidth
          actions={<ProductSubmitButton product={product} />}
        >
          <ProductDetails product={product} />
        </AdminPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  product?: CommonProductFragment;
};
