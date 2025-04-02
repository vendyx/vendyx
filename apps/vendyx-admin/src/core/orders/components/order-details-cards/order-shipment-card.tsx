import { type FC } from 'react';

import { type CommonOrderFragment } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { formatPrice } from '@/shared/utils/formatters';

export const OrderShipmentCard: FC<Props> = ({ order }) => {
  const { shipment } = order;

  if (!shipment) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex flex-col gap-2">
          <p>
            Method: <span className="font-medium text-distinct">{shipment.method}</span>
          </p>
          <p>
            Amount: <span>{formatPrice(shipment.total)}</span>
          </p>
          {shipment.trackingCode && (
            <p>
              Tracking number: <span>{shipment.trackingCode}</span>
            </p>
          )}
          {shipment.carrier && (
            <p>
              Carrier: <span>{shipment.carrier}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
