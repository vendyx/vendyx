import { type FC } from 'react';

import { type CommonOrderFragment, type ShippingMetadata } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { formatPrice } from '@/shared/utils/formatters';

export const OrderShipmentCard: FC<Props> = ({ order }) => {
  const { shipment } = order;
  const shipmentMetadata = shipment?.metadata as ShippingMetadata;

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
          {shipmentMetadata?.trackingCode && (
            <p>
              Tracking number: <span>{shipmentMetadata?.trackingCode}</span>
            </p>
          )}
          {shipmentMetadata?.carrier && (
            <p>
              Carrier: <span>{shipmentMetadata?.carrier}</span>
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
