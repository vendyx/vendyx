import { type FC } from 'react';

import {
  type CommonOrderFragment,
  type PickupMetadata,
  ShipmentType,
  type ShippingMetadata
} from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { formatPrice } from '@/shared/utils/formatters';

export const OrderShipmentCard: FC<Props> = ({ order }) => {
  const { shipment } = order;
  const shipmentMetadata = shipment?.metadata;
  const isPickup = shipment?.type === ShipmentType.Pickup;

  const shippingMetadata = shipmentMetadata as ShippingMetadata;
  const pickupMetadata = shipmentMetadata as PickupMetadata;

  if (!shipment) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex flex-col gap-2">
          <p>
            Method:{' '}
            <span className="font-medium text-distinct">
              {isPickup ? 'In store pickup' : shipment.method}
            </span>
          </p>
          {isPickup && (
            <p>
              Location: <span>{pickupMetadata.location}</span>
            </p>
          )}
          {!isPickup && (
            <p>
              Amount: <span>{formatPrice(shipment.total)}</span>
            </p>
          )}
          {shippingMetadata?.trackingCode && (
            <p>
              Tracking number: <span>{shippingMetadata?.trackingCode}</span>
            </p>
          )}
          {shippingMetadata?.carrier && (
            <p>
              Carrier: <span>{shippingMetadata?.carrier}</span>
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
