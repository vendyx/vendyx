import { type FC } from 'react';

import { type CommonOrderFragment, OrderState, ShipmentType } from '@/api/types';
import { Button } from '@/shared/components/ui/button';

import { MarkOrderAsReadyForPickup } from '../mark-as-ready-for-pickup/mark-as-ready-for-pickup-button';
import { MarkOrderAsDeliveredButton } from '../mark-order-as-delivered/mark-order-as-delivered-button';
import { MarkOrderAsShippedButton } from '../mark-order-as-shipped/mark-order-as-shipped-button';

export const OrderStatusTransitionButton: FC<Props> = ({ order }) => {
  const orderState = order.state;
  const isPickup = order.shipment?.type === ShipmentType.Pickup;

  if (orderState === OrderState.Modifying) {
    return (
      <Button disabled type="button">
        Complete order
      </Button>
    );
  }

  if (orderState === OrderState.PaymentAdded) {
    return <Button type="button">Authorize payment</Button>;
  }

  if (orderState === OrderState.PaymentAuthorized && !isPickup) {
    return <MarkOrderAsShippedButton />;
  }

  if (orderState === OrderState.PaymentAuthorized && isPickup) {
    return <MarkOrderAsReadyForPickup />;
  }

  if (orderState === OrderState.ReadyForPickup) {
    return <MarkOrderAsDeliveredButton />;
  }

  if (orderState === OrderState.Shipped) {
    return <MarkOrderAsDeliveredButton />;
  }

  // Delivered
  return (
    <Button disabled type="button">
      Complete order
    </Button>
  );
};

type Props = {
  order: CommonOrderFragment;
};
