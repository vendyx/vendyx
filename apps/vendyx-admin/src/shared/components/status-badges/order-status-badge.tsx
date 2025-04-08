import { type FC } from 'react';

import { BookmarkIcon, PackageCheckIcon, StoreIcon, TruckIcon } from 'lucide-react';

import { OrderState } from '@/api/types';

import { Badge } from '../ui/badge';

export const OrderStatusBadge: FC<Props> = ({ status }) => {
  if (status === OrderState.Modifying) {
    return <Badge variant="outline">Adding</Badge>;
  }

  if (status === OrderState.PaymentAdded || status === OrderState.PaymentAuthorized) {
    return (
      <Badge
        variant="outline"
        className="flex gap-1 bg-distinct/15 border-distinct text-distinct w-fit"
      >
        <BookmarkIcon size={16} /> Paid
      </Badge>
    );
  }

  if (status === OrderState.ReadyForPickup) {
    return (
      <Badge
        variant="outline"
        className="flex items-center gap-1 bg-warning/15 border-warning text-warning w-fit"
      >
        <StoreIcon size={16} /> Ready for pickup
      </Badge>
    );
  }

  if (status === OrderState.Shipped) {
    return (
      <Badge
        variant="outline"
        className="flex gap-1 bg-warning/15 border-warning text-warning w-fit"
      >
        <TruckIcon size={16} /> Sent
      </Badge>
    );
  }

  if (status === OrderState.Delivered) {
    return (
      <Badge
        variant="outline"
        className="flex gap-1 bg-primary/10 border-primary text-primary w-fit"
      >
        <PackageCheckIcon size={16} /> Completed
      </Badge>
    );
  }

  if (status === OrderState.Canceled) {
    return <Badge variant="outline">Canceled</Badge>;
  }

  return <Badge>Adding</Badge>;
};

type Props = {
  status: OrderState;
};
