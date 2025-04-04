'use client';

import { type FC } from 'react';

import Link from 'next/link';

import { type CommonOrderFragment } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { useBase } from '@/shared/hooks/use-base';
import { formatPhoneNumber, getFullName } from '@/shared/utils/formatters';
import { clean } from '@/shared/utils/obj';

export const OrderCustomerCard: FC<Props> = ({ order }) => {
  const { customer, shippingAddress } = order;
  const base = useBase();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        {customer ? (
          <div className="flex flex-col gap-2">
            <Link
              href={`${base}/customers/${customer.id}`}
              className="font-medium text-distinct hover:underline"
            >
              {getFullName(clean(customer))}
            </Link>
            <p>{customer.email}</p>
            {customer.phoneNumber && <p>{formatPhoneNumber(clean(customer))}</p>}
          </div>
        ) : (
          <p>Guest</p>
        )}
        {shippingAddress && (
          <div className="flex flex-col gap-2">
            <Label className="text-base">Address</Label>
            <p>{shippingAddress.streetLine1}</p>
            {shippingAddress.streetLine2 && <p>{shippingAddress.streetLine2}</p>}
            <p>
              {shippingAddress.postalCode} {shippingAddress.city}, {shippingAddress.province}
            </p>
            <p>{shippingAddress.country}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
