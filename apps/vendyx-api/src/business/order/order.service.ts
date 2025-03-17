import { Inject, Injectable } from '@nestjs/common';
import { Address, Customer, Order, OrderState, Prisma, Shipment, Variant } from '@prisma/client';

import {
  AddCustomerToOrderInput,
  AddPaymentToOrderInput,
  AddShipmentToOrderInput,
  CreateAddressInput,
  CreateOrderAddressInput,
  CreateOrderInput,
  CreateOrderLineInput,
  MarkOrderAsShippedInput,
  UpdateOrderLineInput
} from '@/api/shared/types/gql.types';
import { EventBusService } from '@/event-bus/event-bus.service';
import {
  OrderDeliveredEvent,
  OrderPaidEvent,
  OrderShippedEvent
} from '@/event-bus/events/order.event';
import { PaymentService } from '@/payment/payment.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import {
  ConfigurableProperty,
  ConfigurablePropertyArgs
} from '@/persistence/types/configurable-operation.type';
import { ID } from '@/persistence/types/scalars.type';
import { SecurityService } from '@/security/security.service';
import { ShipmentService } from '@/shipments/shipment.service';

import { OrderFinders } from './order-finders';
import {
  CustomerDisabled,
  CustomerInvalidEmail,
  FailedAddingShippingMethod,
  ForbiddenOrderAction,
  MissingShippingAddress,
  NotEnoughStock,
  OrderTransitionError,
  PaymentDeclined,
  PaymentFailed,
  PaymentMethodNotFound,
  ShippingMethodNotFound
} from './order.errors';
import { ValidOrderTransitions, parseOrderCode } from './order.utils';
import { clean } from '../shared/utils/clean.utils';
import { executeInSafe } from '../shared/utils/execute.utils';
import { validateEmail } from '../shared/utils/validators.utils';

@Injectable()
export class OrderService extends OrderFinders {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly shipmentService: ShipmentService,
    private readonly paymentService: PaymentService,
    private readonly eventBus: EventBusService,
    private readonly securityService: SecurityService
  ) {
    super(prisma);
  }

  async findUnique(id?: string, code?: string) {
    if (id) {
      return await this.prisma.order.findUnique({ where: { id } });
    }

    if (code) {
      return await this.prisma.order.findUnique({ where: { code: parseOrderCode(code) } });
    }

    return null;
  }

  async findAvailableShippingMethods(orderId: ID) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });

    const state = (order?.shippingAddress as unknown as Address | null)?.province;

    if (!state) {
      return new MissingShippingAddress();
    }

    const result = await this.prisma.shippingMethod.findMany({
      where: { enabled: true, zone: { states: { some: { state: { name: state } } } } },
      orderBy: { createdAt: 'desc' }
    });

    return result
      .map(shippingMethod => {
        const args = this.securityService.decrypt<ConfigurablePropertyArgs>(
          (shippingMethod.handler as ConfigurableProperty).args
        );

        if (!args) return null;

        return {
          ...shippingMethod,
          pricePreview: this.shipmentService.getPricePreview({
            ...(shippingMethod.handler as ConfigurableProperty),
            args
          })
        };
      })
      .filter(Boolean);
  }

  async findAvailablePaymentMethods() {
    const result = await this.prisma.paymentMethod.findMany({
      where: { enabled: true },
      orderBy: { createdAt: 'desc' }
    });

    return result.map(item => ({
      ...item,
      name: this.paymentService.getHandler((item.handler as ConfigurableProperty).code).name,
      icon: ''
    }));
  }

  async create(input: CreateOrderInput) {
    const { line } = input;

    if (!line || line.quantity <= 0) {
      return await this.createEmptyOrder();
    }

    const variant = await this.findVariantOrThrow(line.productVariantId);

    if (variant.stock < line.quantity) {
      return new NotEnoughStock();
    }

    return this.createOrderWithLine(variant, line.quantity);
  }

  async addLine(orderId: string, input: CreateOrderLineInput) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { lines: true }
    });

    if (!this.canPerformAction(order, 'modify')) {
      return new ForbiddenOrderAction(order.state);
    }

    const variant = await this.findVariantOrThrow(input.productVariantId);

    if (variant.stock < input.quantity) {
      return new NotEnoughStock();
    }

    const lineWithTheVariant = order.lines.find(
      line => line.productVariantId === input.productVariantId
    );

    const newLinePrice = (input.quantity + (lineWithTheVariant?.quantity ?? 0)) * variant.salePrice;

    // If a line with the variant already exists, only update the quantity and recalculate the line price, not adding a new line
    // NOTE: When updating, we replace the current quantity with the new one, not adding the new quantity to the current one
    if (lineWithTheVariant) {
      const newQuantity = input.quantity + lineWithTheVariant.quantity;

      if (variant.stock < newQuantity) {
        return new NotEnoughStock();
      }

      return await this.prisma.order.update({
        where: { id: orderId },
        data: {
          lines: {
            update: {
              where: { id: lineWithTheVariant.id },
              data: {
                // Increment the quantity because variant already exists
                quantity: { increment: input.quantity },
                // Recalculate the line price with the variant sale price because this can change
                linePrice: (input.quantity + lineWithTheVariant.quantity) * variant.salePrice,
                // Update the unit price in case the variant price has changed
                unitPrice: variant.salePrice
              }
            }
          },
          // Remove the old line price and add the new one
          subtotal: order.subtotal - lineWithTheVariant.linePrice + newLinePrice,
          total: order.total - lineWithTheVariant.linePrice + newLinePrice,
          // Increment the quantity because variant already exists
          totalQuantity: { increment: input.quantity }
        }
      });
    }

    // Add a new line to the order
    return await this.prisma.order.update({
      where: { id: orderId },
      data: {
        lines: {
          create: {
            productVariantId: input.productVariantId,
            quantity: input.quantity,
            linePrice: newLinePrice,
            unitPrice: variant.salePrice
          }
        },
        subtotal: order.subtotal + newLinePrice,
        total: order.total + newLinePrice,
        totalQuantity: order.totalQuantity + input.quantity
      }
    });
  }

  async updateLine(lineId: ID, input: UpdateOrderLineInput) {
    const line = await this.prisma.orderLine.findUniqueOrThrow({
      where: { id: lineId },
      include: { order: true, productVariant: true }
    });

    const { order, productVariant } = line;

    if (!this.canPerformAction(order, 'modify')) {
      return new ForbiddenOrderAction(order.state);
    }

    // If the quantity 0, remove the line and recalculate the order stats
    if (input.quantity <= 0) {
      return await this.prisma.order.update({
        where: { id: order.id },
        data: {
          lines: {
            delete: { id: line.id }
          },
          subtotal: order.subtotal - line.linePrice,
          total: order.total - line.linePrice,
          totalQuantity: order.totalQuantity - line.quantity
        }
      });
    }

    if (productVariant.stock < input.quantity) {
      return new NotEnoughStock();
    }

    const unitPrice = productVariant.salePrice;
    const linePrice = unitPrice * input.quantity;

    // Update the line with the new quantity and line price and order stats
    return await this.prisma.order.update({
      where: { id: order.id },
      data: {
        lines: {
          update: {
            where: { id: line.id },
            data: { quantity: input.quantity, linePrice, unitPrice }
          }
        },
        total: order.total - line.linePrice + linePrice,
        subtotal: order.subtotal - line.linePrice + linePrice,
        totalQuantity: order.totalQuantity - line.quantity + input.quantity
      }
    });
  }

  async removeLine(lineId: ID) {
    const line = await this.prisma.orderLine.findUniqueOrThrow({
      where: { id: lineId },
      include: { order: true }
    });

    if (!this.canPerformAction(line.order, 'modify')) {
      return new ForbiddenOrderAction(line.order.state);
    }

    return await this.prisma.order.update({
      where: { id: line.order.id },
      data: {
        lines: {
          delete: { id: line.id }
        },
        total: line.order.total - line.linePrice,
        subtotal: line.order.subtotal - line.linePrice,
        totalQuantity: line.order.totalQuantity - line.quantity
      }
    });
  }

  async addCustomer(orderId: ID, input: AddCustomerToOrderInput) {
    if (!validateEmail(input.email)) {
      return new CustomerInvalidEmail();
    }

    const order = await this.findOrderOrThrow(orderId);

    if (!this.canPerformAction(order, 'add_customer')) {
      return new ForbiddenOrderAction(order.state);
    }

    const customer = await this.prisma.customer.findUnique({
      where: { email: input.email }
    });

    if (customer?.enabled === false) {
      return new CustomerDisabled();
    }

    return await this.prisma.order.update({
      where: { id: orderId },
      data: {
        customer: { connectOrCreate: { where: { email: input.email }, create: clean(input) } }
      }
    });
  }

  async addShippingAddress(orderId: ID, input: CreateOrderAddressInput) {
    const order = await this.findOrderOrThrow(orderId);

    if (!this.canPerformAction(order, 'add_shipping_address')) {
      return new ForbiddenOrderAction(order.state);
    }

    const country = await this.prisma.country.findUniqueOrThrow({ where: { id: input.countryId } });

    const addressToSave = {
      ...input,
      country: country.name
    };

    return await this.prisma.order.update({
      where: { id: orderId },
      data: { shippingAddress: addressToSave as unknown as Prisma.JsonObject }
    });
  }

  async addShipment(orderId: ID, input: AddShipmentToOrderInput) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { shipment: true }
    });

    if (!order.shippingAddress) {
      return new MissingShippingAddress();
    }

    if (!this.canPerformAction(order, 'add_shipment')) {
      return new ForbiddenOrderAction(order.state);
    }

    const state = (order?.shippingAddress as unknown as Address).province;

    const method = await this.prisma.shippingMethod.findUnique({
      where: {
        id: input.methodId,
        enabled: true,
        zone: { states: { some: { state: { name: state } } } }
      }
    });

    // or not available for provided state
    if (!method) {
      return new ShippingMethodNotFound();
    }

    const handler = method.handler as ConfigurableProperty;
    const decryptedArgs = this.securityService.decrypt<ConfigurablePropertyArgs>(handler.args);

    if (!decryptedArgs) {
      return new FailedAddingShippingMethod("Couldn't decrypt shipping method arguments.");
    }

    const shippingPrice = await this.shipmentService.calculatePrice(order, {
      ...handler,
      args: decryptedArgs
    });

    // If the order already has a shipment, update the amount and method
    if (order.shipment) {
      return await this.prisma.order.update({
        where: { id: orderId },
        data: {
          shipment: {
            update: { amount: shippingPrice, method: method.name }
          },
          total: order.total - order.shipment.amount + shippingPrice
        }
      });
    }

    // If the order doesn't have a shipment, create a new one
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        shipment: {
          create: { amount: shippingPrice, method: method.name }
        },
        total: order.total + shippingPrice
      }
    });
  }

  async addPayment(orderId: ID, input: AddPaymentToOrderInput) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { customer: true, shipment: true, lines: { include: { productVariant: true } } }
    });

    if (!this.canPerformAction(order, 'add_payment')) {
      return new ForbiddenOrderAction(order.state);
    }

    if (!(await this.validateOrderTransitionState(order, OrderState.PAYMENT_ADDED))) {
      return new OrderTransitionError('Either customer or shipment is missing.');
    }

    const method = await this.prisma.paymentMethod.findUnique({
      where: { id: input.methodId, enabled: true }
    });

    if (!method) {
      return new PaymentMethodNotFound();
    }

    const handler = method.handler as ConfigurableProperty;
    const handlerName = this.paymentService.getHandler(handler.code).name;

    const paymentHandlerResult = await executeInSafe(() =>
      this.paymentService.create(order, handler)
    );

    if (!paymentHandlerResult) {
      return new PaymentFailed();
    }

    if (paymentHandlerResult.status === 'declined') {
      return new PaymentDeclined(paymentHandlerResult.error, paymentHandlerResult.rawError);
    }

    let orderToReturn: Order = order;

    if (paymentHandlerResult.status === 'created') {
      orderToReturn = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          payment: {
            create: { amount: paymentHandlerResult.amount, method: handlerName }
          },
          state: OrderState.PAYMENT_ADDED,
          placedAt: new Date()
        }
      });
    }

    if (paymentHandlerResult.status === 'authorized') {
      orderToReturn = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          payment: {
            create: {
              amount: paymentHandlerResult.amount,
              method: handlerName,
              transactionId: paymentHandlerResult.transactionId
            }
          },
          state: OrderState.PAYMENT_AUTHORIZED,
          placedAt: new Date()
        }
      });
    }

    // Decrement the stock of the bought variants
    await this.prisma.$transaction(
      order.lines.map(line =>
        this.prisma.variant.update({
          where: { id: line.productVariant.id },
          data: { stock: { decrement: line.quantity } }
        })
      )
    );

    this.eventBus.emit(new OrderPaidEvent(orderToReturn.id));

    return orderToReturn;
  }

  async markAsShipped(orderId: ID, input: MarkOrderAsShippedInput) {
    const order = await this.findOrderOrThrow(orderId);

    if (!this.canPerformAction(order, 'mark_as_shipped')) {
      return new ForbiddenOrderAction(order.state);
    }

    if (!(await this.validateOrderTransitionState(order, OrderState.SHIPPED))) {
      return new OrderTransitionError(
        `Unable to transition to ${OrderState.SHIPPED} state in ${order.state} state.`
      );
    }

    const result = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        shipment: { update: { carrier: input.carrier, trackingCode: input.trackingCode } },
        state: OrderState.SHIPPED
      }
    });

    this.eventBus.emit(new OrderShippedEvent(orderId));

    return result;
  }

  async markAsDelivered(orderId: ID) {
    const order = await this.findOrderOrThrow(orderId);

    if (!this.canPerformAction(order, 'mark_as_delivered')) {
      return new ForbiddenOrderAction(order.state);
    }

    if (!(await this.validateOrderTransitionState(order, OrderState.DELIVERED))) {
      return new OrderTransitionError(
        `Unable to transition to ${OrderState.DELIVERED} state in ${order.state} state.`
      );
    }

    const result = await this.prisma.order.update({
      where: { id: orderId },
      data: { state: OrderState.DELIVERED }
    });

    this.eventBus.emit(new OrderDeliveredEvent(orderId));

    return result;
  }

  async cancel(orderId: ID) {
    const order = await this.findOrderOrThrow(orderId);

    if (!this.canPerformAction(order, 'cancel')) {
      return new ForbiddenOrderAction(order.state);
    }

    return await this.prisma.order.update({
      where: { id: orderId },
      data: { state: OrderState.CANCELED }
    });
  }

  /**
   * Validates if the order can perform the given action
   */
  private canPerformAction(
    order: Order & { customer?: Customer | null; shipment?: Shipment | null },
    action: OrderAction
  ) {
    if (action === 'modify') return order.state === OrderState.MODIFYING;

    if (action === 'add_customer') return order.state === OrderState.MODIFYING;

    if (action === 'add_shipping_address') return order.state === OrderState.MODIFYING;

    if (action === 'add_shipment') {
      const hasShippingAddress = Boolean(order.shippingAddress);

      return hasShippingAddress && order.state === OrderState.MODIFYING;
    }

    if (action === 'add_payment') {
      const hasCustomer = Boolean(order.customer);
      const hasShipment = Boolean(order.shipment);

      return hasCustomer && hasShipment && order.state === OrderState.MODIFYING;
    }

    if (action === 'mark_as_shipped') return order.state === OrderState.PAYMENT_AUTHORIZED;

    if (action === 'mark_as_delivered') return order.state === OrderState.SHIPPED;

    if (action === 'cancel')
      return order.state !== OrderState.CANCELED && order.state !== OrderState.DELIVERED;
  }

  /**
   * Validate if the order can transition to the new state
   */
  private async validateOrderTransitionState(order: Order, newState: OrderState) {
    const prevState = order.state;
    const nextState = newState;

    const transitionStateAllowed = ValidOrderTransitions.some(
      t => t[0] === prevState && t[1] === nextState
    );

    if (!transitionStateAllowed) {
      return false;
    }

    if (nextState === OrderState.PAYMENT_ADDED || nextState === OrderState.PAYMENT_AUTHORIZED) {
      const orderToVerify = await this.prisma.order.findUniqueOrThrow({
        where: { id: order.id },
        include: { customer: true, shipment: true }
      });

      if (!orderToVerify?.customer || !orderToVerify?.shipment) {
        return false;
      }
    }

    return transitionStateAllowed;
  }

  /**
   * Create an empty order without any line
   */
  private async createEmptyOrder() {
    return this.prisma.order.create({ data: {} });
  }

  /**
   * Create an order with a line
   */
  private async createOrderWithLine(variant: Variant, quantity: number) {
    const unitPrice = variant.salePrice;
    const linePrice = unitPrice * quantity;

    return await this.prisma.order.create({
      data: {
        lines: {
          create: { productVariantId: variant.id, quantity: quantity, linePrice, unitPrice }
        },
        total: linePrice,
        subtotal: linePrice,
        totalQuantity: quantity
      }
    });
  }

  private async findOrderOrThrow(id: ID) {
    return this.prisma.order.findUniqueOrThrow({ where: { id } });
  }

  private async findVariantOrThrow(id: ID) {
    return this.prisma.variant.findUniqueOrThrow({ where: { id } });
  }
}

type OrderAction =
  | 'modify'
  | 'add_customer'
  | 'add_shipping_address'
  | 'add_shipment'
  | 'add_payment'
  | 'mark_as_shipped'
  | 'mark_as_delivered'
  | 'cancel';
