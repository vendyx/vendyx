import { type FC } from 'react';

import Link from 'next/link';

import { type CommonCustomerOrderFragment, ShipmentType } from '@/api/types';
import { OrderStatusBadge } from '@/shared/components/status-badges/order-status-badge';
import { TableCell, TableRow } from '@/shared/components/ui/table';
import { formatDate, formatPrice } from '@/shared/utils/formatters';

export const CustomerOrdersTableRow: FC<Props> = ({ order, base }) => {
  const shipment =
    order.shipment?.type === ShipmentType.Pickup ? 'In store pickup' : order.shipment?.method;

  return (
    <TableRow key={order.id}>
      <TableCell>
        <Link href={`${base}/orders/${order.id}`} className="w-full hover:underline">
          {order.code}
        </Link>
      </TableCell>

      <TableCell className="text-nowrap">
        {formatDate(new Date(order.placedAt as string))}
      </TableCell>
      <TableCell>{shipment}</TableCell>
      <TableCell>{formatPrice(order.total)}</TableCell>

      <TableCell>
        <OrderStatusBadge status={order.state} />
      </TableCell>
    </TableRow>
  );
};

type Props = {
  base: string;
  order: CommonCustomerOrderFragment;
};
