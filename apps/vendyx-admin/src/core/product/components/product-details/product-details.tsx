'use client';

import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonProductFragment } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { FormCheckbox } from '@/shared/form/form-checkbox';
import { FormInput } from '@/shared/form/form-input';
import { FormSwitch } from '@/shared/form/form-switch';
import { FormTextarea } from '@/shared/form/form-textarea';

import { VariantContextProvider } from '../../contexts/variant.context';
import { ProductAssetUploader } from '../product-asset-uploader/product-asset-uploader';
import { ProductOrganization } from '../product-organization/product-organization';
import { ProductSubmitButton } from '../product-submit-button/product-submit-button';
import { RemoveProductButton } from '../remove-product/remove-product-button';
import { VariantDetails } from '../variant-details/variant-details';
import { type ProductDetailsFormInput } from './use-product-details-form';

export const ProductDetails: FC<Props> = ({ product }) => {
  const { control } = useFormContext<ProductDetailsFormInput>();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-4 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <FormInput control={control} name="name" label="Name" placeholder="T-Shirt" />
              <FormTextarea control={control} name="description" label="Description" />
            </CardContent>
          </Card>

          {!product?.options.length && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex gap-3 w-full">
                    <FormInput
                      control={control}
                      name="price"
                      label="Price"
                      placeholder="$ 0.00"
                      isPrice
                    />
                    <FormInput
                      isPrice
                      control={control}
                      name="comparisonPrice"
                      label="Comparison price"
                      placeholder="$ 0.00"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stock</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-3">
                  <FormInput
                    control={control}
                    name="stock"
                    type="number"
                    label="Quantity"
                    placeholder="0"
                  />
                  <FormInput control={control} name="sku" label="SKU" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <FormCheckbox
                    control={control}
                    name="requiresShipping"
                    label="This product requires shipping"
                  />
                </CardContent>
              </Card>
            </>
          )}

          <VariantContextProvider product={product}>
            <VariantDetails />
          </VariantContextProvider>
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <Card>
            <CardContent className="flex flex-col gap-4 mt-6">
              <Label className="text-base">Product status</Label>
              <FormSwitch control={control} name="enabled" label="Published" />
            </CardContent>
          </Card>

          <ProductAssetUploader product={product} />

          <ProductOrganization product={product} />
        </div>
      </div>
      {product && (
        <div className="flex gap-3 justify-end">
          <RemoveProductButton product={product} />
          <ProductSubmitButton product={product} size="sm" />
        </div>
      )}
    </div>
  );
};

type Props = {
  product?: CommonProductFragment;
  isLoading?: boolean;
};
