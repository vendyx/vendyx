import { type FC } from 'react';

import { type CommonProductFragment } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

import { ProductTags } from './product-tags/product-tags';

export const ProductOrganization: FC<Props> = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductTags product={product} />
      </CardContent>
    </Card>
  );
};

type Props = {
  product: CommonProductFragment | undefined;
};
