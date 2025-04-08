import { ID } from '@/persistence/types/scalars.type';

import { VendyxEvent } from './vendyx.event';

export enum OrderEvent {
  PAID = 'order.paid',
  READY_FOR_PICKUP = 'order.ready_for_pickup',
  SHIPPED = 'order.shipped',
  DELIVERED = 'order.delivered',
  CANCELLED = 'order.cancelled'
}

/**
 * @description
 * Event emitted when has been added a payment to an order.
 */
export class OrderPaidEvent extends VendyxEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.PAID);
  }
}

export class OrderReadyForPickupEvent extends VendyxEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.READY_FOR_PICKUP);
  }
}

/**
 * @description
 * Event emitted when an order has been marked as shipped
 */
export class OrderShippedEvent extends VendyxEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.SHIPPED);
  }
}

/**
 * @description
 * Event emitted when an order has been marked as delivered
 */
export class OrderDeliveredEvent extends VendyxEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.DELIVERED);
  }
}

/**
 * @description
 * Event emitted when an order has been cancelled
 */
export class OrderCancelledEvent extends VendyxEvent {
  constructor(public readonly orderId: ID) {
    super(OrderEvent.CANCELLED);
  }
}
