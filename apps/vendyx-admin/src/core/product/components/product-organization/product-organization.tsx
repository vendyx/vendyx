import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

import { ProductTags } from './product-tags/product-tags';

export const ProductOrganization = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductTags />
      </CardContent>
    </Card>
  );
};
