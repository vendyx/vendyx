import { notFound } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { OrderService } from '@/api/services/order.service';
import { OrderActionsButton } from '@/core/orders/components/order-actions/order-actions-button';
import { OrderCustomerCard } from '@/core/orders/components/order-details-cards/order-customer-card';
import { OrderItemsTable } from '@/core/orders/components/order-details-cards/order-items-table';
import { OrderPaymentCard } from '@/core/orders/components/order-details-cards/order-payment-card';
import { OrderShipmentCard } from '@/core/orders/components/order-details-cards/order-shipment-card';
import { OrderStatusTransitionButton } from '@/core/orders/components/order-status/order-status-transition-button';
import { AdminPageLayout } from '@/shared/components/layout/admin-page-layout/admin-page-layout';
import { EntityProvider } from '@/shared/contexts/entity-context';

export default async function OrderDetails({ params }: { params: { id: ID } }) {
  const order = await OrderService.getById(params.id);

  if (!order) {
    notFound();
  }

  return (
    <EntityProvider entity={order}>
      <AdminPageLayout
        title={order.code}
        actions={
          <div className="flex gap-2 lg:gap-4 items-center">
            <OrderStatusTransitionButton order={order} />
            <OrderActionsButton order={order} />
          </div>
        }
      >
        <div className="flex flex-col lg:grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <OrderItemsTable order={order} />
          </div>
          <div className="col-span-1 flex flex-col gap-6">
            <OrderCustomerCard order={order} />
            <OrderPaymentCard order={order} />
            <OrderShipmentCard order={order} />
          </div>
        </div>
      </AdminPageLayout>
    </EntityProvider>
  );
}
