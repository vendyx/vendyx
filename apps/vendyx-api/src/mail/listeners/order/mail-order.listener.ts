import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  OrderDeliveredEvent,
  OrderEvent,
  OrderPaidEvent,
  OrderReadyForPickupEvent,
  OrderShippedEvent
} from '@/event-bus/events/order.event';

import { MailOrderService } from './mail-order.service';

@Injectable()
export class MailOrderListener {
  constructor(private readonly mailOrderService: MailOrderService) {}

  @OnEvent(OrderEvent.PAID)
  async handleOrderPaidEvent(payload: OrderPaidEvent) {
    try {
      await this.mailOrderService.sendOrderConfirmationEmail(payload.orderId);
    } catch (error) {
      console.log(error);
    }
  }

  @OnEvent(OrderEvent.SHIPPED)
  async handleOrderShippedEvent(payload: OrderShippedEvent) {
    try {
      await this.mailOrderService.sendOrderSentEmail(payload.orderId);
    } catch (error) {
      console.log(error);
    }
  }

  @OnEvent(OrderEvent.DELIVERED)
  async handleOrderDeliveredEvent(payload: OrderDeliveredEvent) {
    try {
      await this.mailOrderService.sendOrderDeliverEmail(payload.orderId);
    } catch (error) {
      console.log(error);
    }
  }

  @OnEvent(OrderEvent.READY_FOR_PICKUP)
  async handleOrderReadyForPickupEvent(payload: OrderReadyForPickupEvent) {
    try {
      // await this.mailOrderService.sendOrderReadyForPickupEmail(payload.orderId);
      Logger.log('Order ready for pickup event', payload);
    } catch (error) {
      console.log(error);
    }
  }
}
