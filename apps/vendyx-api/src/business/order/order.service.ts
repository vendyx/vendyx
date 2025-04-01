import { Inject, Injectable } from '@nestjs/common';
import {
  Address,
  Customer,
  Discount,
  DiscountApplicationMode,
  DiscountType,
  DiscountValueType,
  Order,
  OrderLine,
  OrderRequirementType,
  OrderState,
  Prisma,
  Shipment,
  Variant
} from '@prisma/client';
import { InputJsonArray, JsonValue } from '@prisma/client/runtime/library';

import {
  AddCustomerToOrderInput,
  AddPaymentToOrderInput,
  AddShipmentToOrderInput,
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
import {
  ActiveDiscount,
  BuyXGetYDiscountMetadata,
  BuyXGetYDiscountMetadataRequirement,
  ProductDiscountMetadata,
  ShippingDiscountMetadata
} from '@/persistence/types/discount-metadata';
import { OrderAddressJson } from '@/persistence/types/order-address-json';
import { ID } from '@/persistence/types/scalars.type';
import { SecurityService } from '@/security/security.service';
import { ShipmentService } from '@/shipments/shipment.service';

import { OrderFinders } from './order-finders';
import {
  CustomerDisabled,
  CustomerInvalidEmail,
  DiscountCodeNotApplicable,
  FailedAddingShippingMethod,
  ForbiddenOrderAction,
  InvalidDiscountCode,
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

      const orderUpdated = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          lines: {
            update: {
              where: { id: lineWithTheVariant.id },
              data: {
                // Increment the quantity because variant already exists
                quantity: { increment: input.quantity },
                // Recalculate the line price with the variant sale price because this can change
                lineSubtotal: (input.quantity + lineWithTheVariant.quantity) * variant.salePrice,
                lineTotal: (input.quantity + lineWithTheVariant.quantity) * variant.salePrice,
                // Update the unit price in case the variant price has changed
                unitPrice: variant.salePrice
              }
            }
          },
          // Remove the old line price and add the new one
          subtotal: order.subtotal - lineWithTheVariant.lineTotal + newLinePrice,
          total: order.total - lineWithTheVariant.lineTotal + newLinePrice,
          // Increment the quantity because variant already exists
          totalQuantity: { increment: input.quantity }
        },
        include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
      });

      return await this.applyDiscounts(orderUpdated, []);
    }

    // Add a new line to the order
    const orderSaved = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        lines: {
          create: {
            productVariantId: input.productVariantId,
            quantity: input.quantity,
            lineSubtotal: newLinePrice,
            lineTotal: newLinePrice,
            unitPrice: variant.salePrice
          }
        },
        subtotal: order.subtotal + newLinePrice,
        total: order.total + newLinePrice,
        totalQuantity: order.totalQuantity + input.quantity
      },
      include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
    });

    return await this.applyDiscounts(orderSaved, []);
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
      const orderUpdated = await this.prisma.order.update({
        where: { id: order.id },
        data: {
          lines: {
            delete: { id: line.id }
          },
          subtotal: order.subtotal - line.lineTotal,
          total: order.total - line.lineTotal,
          totalQuantity: order.totalQuantity - line.quantity
        },
        include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
      });

      return await this.applyDiscounts(orderUpdated, []);
    }

    if (productVariant.stock < input.quantity) {
      return new NotEnoughStock();
    }

    const unitPrice = productVariant.salePrice;
    const linePrice = unitPrice * input.quantity;

    // Update the line with the new quantity and line price and order stats
    const orderUpdated = await this.prisma.order.update({
      where: { id: order.id },
      data: {
        lines: {
          update: {
            where: { id: line.id },
            data: {
              quantity: input.quantity,
              lineSubtotal: linePrice,
              lineTotal: linePrice,
              unitPrice
            }
          }
        },
        total: order.total - line.lineTotal + linePrice,
        subtotal: order.subtotal - line.lineTotal + linePrice,
        totalQuantity: order.totalQuantity - line.quantity + input.quantity
      },
      include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
    });

    return this.applyDiscounts(orderUpdated, []);
  }

  async removeLine(lineId: ID) {
    const line = await this.prisma.orderLine.findUniqueOrThrow({
      where: { id: lineId },
      include: { order: true }
    });

    if (!this.canPerformAction(line.order, 'modify')) {
      return new ForbiddenOrderAction(line.order.state);
    }

    const orderUpdated = await this.prisma.order.update({
      where: { id: line.order.id },
      data: {
        lines: {
          delete: { id: line.id }
        },
        total: line.order.total - line.lineTotal,
        subtotal: line.order.subtotal - line.lineTotal,
        totalQuantity: line.order.totalQuantity - line.quantity
      },
      include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
    });

    return this.applyDiscounts(orderUpdated, []);
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

    const orderUpdated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        customer: { connectOrCreate: { where: { email: input.email }, create: clean(input) } }
      },
      include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
    });

    return await this.applyDiscounts(orderUpdated, []);
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

    const orderUpdated = await this.prisma.order.update({
      where: { id: orderId },
      data: { shippingAddress: addressToSave as unknown as Prisma.JsonObject },
      include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
    });

    return await this.applyDiscounts(orderUpdated, []);
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
      const orderUpdated = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          shipment: {
            update: { amount: shippingPrice, total: shippingPrice, method: method.name }
          },
          total: order.total - order.shipment.amount + shippingPrice
        },
        include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
      });

      return this.applyDiscounts(orderUpdated, []);
    }

    // If the order doesn't have a shipment, create a new one
    const orderUpdated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        shipment: {
          create: { amount: shippingPrice, total: shippingPrice, method: method.name }
        },
        total: order.total + shippingPrice
      },
      include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
    });

    return this.applyDiscounts(orderUpdated, []);
  }

  async addPayment(orderId: ID, input: AddPaymentToOrderInput) {
    const orderToIntend = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { customer: true, shipment: true, lines: { include: { productVariant: true } } }
    });
    const order = await this.applyDiscounts(orderToIntend, []);

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
    const orderLevelDiscounts = order.activeDiscounts as unknown as ActiveDiscount[];
    const shipmentLevelDiscounts = order.shipment?.activeDiscounts as unknown as ActiveDiscount[];
    const orderLineLevelDiscounts = order.lines.flatMap(
      line => line.activeDiscounts as unknown as ActiveDiscount[]
    );

    const discountIds = [
      ...orderLevelDiscounts.map(d => d.id),
      ...(shipmentLevelDiscounts?.map(d => d.id) ?? []),
      ...orderLineLevelDiscounts.map(d => d.id)
    ].filter((d, index, self) => index === self.findIndex(d2 => d2 === d));

    if (paymentHandlerResult.status === 'created') {
      orderToReturn = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          payment: {
            create: { amount: paymentHandlerResult.amount, method: handlerName }
          },
          state: OrderState.PAYMENT_ADDED,
          placedAt: new Date(),
          discounts: {
            create: discountIds.map(id => ({
              discountId: id
            }))
          }
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
          placedAt: new Date(),
          discounts: {
            create: discountIds.map(id => ({
              discountId: id
            }))
          }
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

  /**
   * @description
   * Add a discount code to the order
   * If the discount is not found or disabled, return `InvalidDiscountCode` error
   * If the discount is not applicable to the order, return `DiscountCodeNotApplicable` error
   * If the discount is applicable, apply it to the order and return the updated order
   */
  async addDiscountCode(orderId: ID, code: string) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
    });

    if (!this.canPerformAction(order, 'modify_discounts')) {
      return new ForbiddenOrderAction(order.state);
    }

    const discount = await this.prisma.discount.findUnique({
      where: { handle: code }
    });

    if (!discount?.enabled) {
      return new InvalidDiscountCode();
    }

    const orderWithDiscounts = await this.applyDiscounts(order, [discount]);

    const activeDiscounts = this.getActiveDiscounts(orderWithDiscounts);

    const wasDiscountApplied = activeDiscounts.some(d => d.handle === code);

    if (!wasDiscountApplied) {
      return new DiscountCodeNotApplicable();
    }

    return orderWithDiscounts;
  }

  /**
   * @description
   * Remove a discount code from the order
   */
  async removeDiscountCode(orderId: ID, code: string) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
    });

    if (!this.canPerformAction(order, 'modify_discounts')) {
      return new ForbiddenOrderAction(order.state);
    }

    return this.applyDiscounts(order, [], [code]);
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
   * @description
   * Apply any available discounts to the given order
   * Applies automatics discounts, coupon codes passed and discounts already applied to the order
   */
  private async applyDiscounts(
    orderParam: OrderForDiscount,
    discountCodesToApply: Discount[] = [],
    discountCodesToRemove: string[] = []
  ) {
    const orderCouponCodes = (orderParam.activeDiscounts as unknown as ActiveDiscount[]).filter(
      d => d.applicationMode === DiscountApplicationMode.CODE
    );
    const orderLinesCouponCodes = orderParam.lines
      .flatMap(line => line.activeDiscounts as unknown as ActiveDiscount[])
      .filter(
        (lineDiscount, index, self) =>
          index ===
          self.findIndex(d => d.id === lineDiscount.id && d.handle === lineDiscount.handle)
      )
      .filter(d => d.applicationMode === DiscountApplicationMode.CODE);
    const shipmentCouponCodes = orderParam.shipment
      ? (orderParam.shipment.activeDiscounts as unknown as ActiveDiscount[]).filter(
          d => d.applicationMode === DiscountApplicationMode.CODE
        )
      : [];

    const couponCodesAlreadyInOrder = await this.prisma.discount.findMany({
      where: {
        id: {
          in: [...orderCouponCodes, ...orderLinesCouponCodes, ...shipmentCouponCodes].map(d => d.id)
        },
        enabled: true
      }
    });

    const discounts = [
      ...(await this.prisma.discount.findMany({
        where: { applicationMode: DiscountApplicationMode.AUTOMATIC, enabled: true }
      })),
      ...couponCodesAlreadyInOrder,
      ...discountCodesToApply
    ]
      .filter(d => !discountCodesToRemove.includes(d.handle))
      .filter(
        (discount, index, self) =>
          index === self.findIndex(d => d.id === discount.id && d.handle === discount.handle)
      );

    const order = this.calculateOrderPricesBeforeDiscounts(orderParam);

    if (!discounts.length) {
      await this.prisma.order.update({
        where: { id: order.id },
        data: {
          total: order.total,
          subtotal: order.subtotal,
          activeDiscounts: order.activeDiscounts as unknown as InputJsonArray,
          lines: {
            updateMany: order.lines.map(line => ({
              where: { id: line.id },
              data: {
                lineTotal: line.lineTotal,
                activeDiscounts: line.activeDiscounts as unknown as InputJsonArray
              }
            }))
          },
          ...(order.shipment && {
            shipment: {
              update: {
                total: order.shipment.total,
                activeDiscounts: order.shipment.activeDiscounts as unknown as InputJsonArray
              }
            }
          })
        }
      });

      return order;
    }

    let pastCustomerDiscounts: Discount[] = [];

    if (order.customer) {
      pastCustomerDiscounts = (
        await this.prisma.order.findMany({
          where: {
            customerId: order.customer.id,
            state: { not: OrderState.MODIFYING },
            discounts: {
              some: {
                discountId: { in: discounts.map(d => d.id) }
              }
            }
            // placedAt: { gte: discount.startsAt } // TODO: can use the minor discounts startsAt date
          },
          include: {
            discounts: {
              include: {
                discount: true
              }
            }
          }
        })
      ).flatMap(p => p.discounts.map(d => d.discount));
    }

    const applicableDiscounts = this.getApplicableDiscounts(
      order,
      discounts,
      pastCustomerDiscounts.map(d => d.id)
    );

    const combinations = this.getDiscountsCombinations(applicableDiscounts);

    const bestDiscounts = this.getBestDiscounts(order, combinations);

    for (const discount of bestDiscounts) {
      const discountedPrice = this.getDiscountedPrice(order, discount);

      if (discountedPrice.orderSubtotal !== undefined) {
        const discountedAmount = order.subtotal - discountedPrice.orderSubtotal;

        order.subtotal = discountedPrice.orderSubtotal < 0 ? 0 : discountedPrice.orderSubtotal;
        order.total = order.subtotal + (order.shipment?.amount ?? 0);
        order.activeDiscounts = [
          ...(order.activeDiscounts as unknown as ActiveDiscount[]),
          new ActiveDiscount(
            discount.id,
            discount.handle,
            discount.applicationMode,
            discountedAmount
          )
        ] as unknown as JsonValue;

        continue;
      } else if (Boolean(discountedPrice.lines?.details.length)) {
        const originalSubtotalPrice = order.lines.reduce(
          (acc, line) => acc + line.quantity * line.unitPrice,
          0
        );

        for (const line of discountedPrice?.lines?.details ?? []) {
          const lineToUpdate = order.lines.find(l => l.id === line.lineId);
          if (lineToUpdate) {
            const discountedAmount = lineToUpdate.lineTotal - line.linePrice;

            lineToUpdate.lineTotal = line.linePrice < 0 ? 0 : line.linePrice;
            lineToUpdate.activeDiscounts = [
              ...(lineToUpdate.activeDiscounts as unknown as ActiveDiscount[]),
              new ActiveDiscount(
                discount.id,
                discount.handle,
                discount.applicationMode,
                discountedAmount
              )
            ] as unknown as JsonValue;
          }
        }

        const alreadyDiscountedFromSubtotal = originalSubtotalPrice - order.subtotal;
        const newSubtotal = order.lines.reduce((acc, line) => acc + line.lineTotal, 0);
        order.subtotal = newSubtotal - alreadyDiscountedFromSubtotal;
        order.total = order.subtotal + (order.shipment?.amount ?? 0);

        continue;
      } else if (discountedPrice.shipmentAmount && order.shipment) {
        const discountedAmount = order.shipment.total - discountedPrice.shipmentAmount;

        order.shipment.total =
          discountedPrice.shipmentAmount < 0 ? 0 : discountedPrice.shipmentAmount;
        order.total = order.subtotal + order.shipment.total;
        order.shipment.activeDiscounts = [
          ...(order.shipment.activeDiscounts as unknown as ActiveDiscount[]),
          new ActiveDiscount(
            discount.id,
            discount.handle,
            discount.applicationMode,
            discountedAmount
          )
        ] as unknown as JsonValue;

        continue;
      }
    }

    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        total: order.total,
        subtotal: order.subtotal,
        activeDiscounts: order.activeDiscounts as unknown as InputJsonArray,
        lines: {
          updateMany: order.lines.map(line => ({
            where: { id: line.id },
            data: {
              lineTotal: line.lineTotal,
              activeDiscounts: line.activeDiscounts as unknown as InputJsonArray
            }
          }))
        },
        ...(order.shipment && {
          shipment: {
            update: {
              total: order.shipment.total,
              activeDiscounts: order.shipment.activeDiscounts as unknown as InputJsonArray
            }
          }
        })
      }
    });

    return order;
  }

  /**
   * @description
   * Get the applicable discounts for the given order
   */
  private getApplicableDiscounts(
    order: OrderForDiscount,
    discounts: Discount[],
    pastDiscounts: ID[]
  ) {
    const applicableDiscounts: Discount[] = [];

    for (const discount of discounts) {
      if (!discount.enabled) continue;

      const hasFinished = discount.endsAt ? discount.endsAt < new Date() : false;
      const hasStarted = discount.startsAt <= new Date();
      const isActive = hasStarted && !hasFinished;

      if (!isActive) continue;

      const hasMinimumAmountRequired =
        discount.orderRequirementType === OrderRequirementType.MINIMUM_AMOUNT
          ? order.total >= (discount.orderRequirementValue ?? 0)
          : true;

      const isMinimumQuantityRequired =
        discount.orderRequirementType === OrderRequirementType.MINIMUM_ITEMS
          ? order.totalQuantity >= (discount.orderRequirementValue ?? 0)
          : true;

      if (!hasMinimumAmountRequired) continue;
      if (!isMinimumQuantityRequired) continue;

      const timesUsed = pastDiscounts.filter(p => p === discount.id).length;
      const perCustomerLimit = discount.perCustomerLimit;

      if (perCustomerLimit && timesUsed >= perCustomerLimit) continue;

      if (discount.type === DiscountType.ORDER) {
        applicableDiscounts.push(discount);
        continue;
      }

      if (discount.type === DiscountType.PRODUCT) {
        const { variants } = discount.metadata as ProductDiscountMetadata;

        const hasVariants = order.lines.some(line => variants.includes(line.productVariantId));

        if (!hasVariants) continue;

        applicableDiscounts.push(discount);
        continue;
      }

      if (discount.type === DiscountType.SHIPPING) {
        const { countries, allCountries } = discount.metadata as ShippingDiscountMetadata;

        if (allCountries) {
          applicableDiscounts.push(discount);
          continue;
        }

        const shippingAddress = order.shippingAddress as unknown as OrderAddressJson;

        if (!shippingAddress) continue;

        const hasCountry = countries.some(countryId => shippingAddress.countryId === countryId);

        if (!hasCountry) continue;

        applicableDiscounts.push(discount);
        continue;
      }

      if (discount.type === DiscountType.BUY_X_GET_Y) {
        const { buy, get } = discount.metadata as BuyXGetYDiscountMetadata;

        const linesWithRequiredVariants = order.lines.filter(line =>
          buy.variants.includes(line.productVariantId)
        );

        if (buy.requirement === BuyXGetYDiscountMetadataRequirement.MIN_QUANTITY) {
          const totalQuantityOfRequiredVariants = linesWithRequiredVariants.reduce(
            (acc, line) => acc + line.quantity,
            0
          );

          const totalQuantityRequiredReached =
            totalQuantityOfRequiredVariants >= buy.requirementValue;

          if (!totalQuantityRequiredReached) continue;
        }

        if (buy.requirement === BuyXGetYDiscountMetadataRequirement.MIN_AMOUNT) {
          const totalAmount = linesWithRequiredVariants.reduce(
            (acc, line) => acc + line.quantity * line.productVariant.salePrice,
            0
          );

          if (totalAmount < buy.requirementValue) continue;
        }

        const linesWithApplicableVariants = order.lines.filter(line =>
          get.variants.includes(line.productVariantId)
        );

        const totalQuantityOfApplicableVariants = linesWithApplicableVariants.reduce(
          (acc, line) => acc + line.quantity,
          0
        );

        const totalQuantityToGiveReached = totalQuantityOfApplicableVariants >= get.quantity;

        if (!totalQuantityToGiveReached) continue;

        applicableDiscounts.push(discount);
        continue;
      }
    }

    return applicableDiscounts;
  }

  /**
   * @description
   * Get all possible combinations for the given discounts
   */
  private getDiscountsCombinations(discounts: Discount[]): Discount[][] {
    const combinations: Discount[][] = [];

    for (const discount of discounts) {
      if (!discount.availableCombinations.length) {
        combinations.push([discount]);
        continue;
      }

      const possibleCombinations = discounts.filter(d => {
        return (
          d.availableCombinations.includes(discount.type) &&
          discount.availableCombinations.includes(d.type)
        );
      });

      if (!possibleCombinations.length) {
        combinations.push([discount]);
        continue;
      } else if (possibleCombinations.length === 1) {
        combinations.push([discount, ...possibleCombinations]);
        continue;
      }

      const availableCombinations = possibleCombinations.filter(d => {
        return possibleCombinations.every(
          p => p.availableCombinations.includes(d.type) && p.id !== d.id
        );
      });

      if (!availableCombinations.length) {
        combinations.push([discount]);
        continue;
      }

      combinations.push([discount, ...availableCombinations]);
    }

    return combinations;
  }

  /**
   * @description
   * Get the best discount combinations for the given order
   */
  private getBestDiscounts(order: OrderForDiscount, discounts: Discount[][]) {
    const newPrices: { total: number; discount: Discount }[][] = [];

    for (const discount of discounts) {
      const newOrderPrice = this.getOrderTotalsWithDiscounts(order, discount);
      newPrices.push(newOrderPrice);
    }

    const bestDiscounts = newPrices.sort(
      (a, b) =>
        b.reduce((acc, curr) => acc + (order.total - curr.total), 0) -
        a.reduce((acc, curr) => acc + (order.total - curr.total), 0)
    );

    return bestDiscounts?.[0]?.map(d => d.discount) ?? [];
  }

  /**
   * @description
   * Get the new order totals with the given discounts
   */
  private getOrderTotalsWithDiscounts(order: OrderForDiscount, discounts: Discount[]) {
    const discountsWithPrices: { total: number; discount: Discount }[] = [];

    for (const discount of discounts) {
      const discountedPrice = this.getDiscountedPrice(order, discount);

      if (discountedPrice.orderSubtotal !== undefined) {
        discountsWithPrices.push({
          total: discountedPrice.orderSubtotal + (order.shipment?.amount ?? 0),
          discount
        });
        continue;
      } else if (Boolean(discountedPrice.lines?.details.length)) {
        const subTotal = order.lines.reduce((acc, line) => {
          const discountedLine = discountedPrice.lines?.details.find(l => l.lineId === line.id);
          return acc + (discountedLine ? discountedLine.linePrice : line.lineTotal);
        }, 0);

        discountsWithPrices.push({
          total: subTotal + (order.shipment?.amount ?? 0),
          discount
        });
        continue;
      } else if (discountedPrice.shipmentAmount && order.shipment) {
        discountsWithPrices.push({
          total: order.subtotal + discountedPrice.shipmentAmount,
          discount
        });
        continue;
      }
    }

    return discountsWithPrices;
  }

  /**
   * @description
   * Get the {@link DiscountPrice} for the given order and discount
   */
  private getDiscountedPrice(order: OrderForDiscount, discount: Discount): DiscountPrice {
    if (discount.type === DiscountType.ORDER) {
      const { discountValueType, discountValue } = discount;

      const isPercentage = discountValueType === DiscountValueType.PERCENTAGE;
      const discountPrice = isPercentage ? (order.subtotal * discountValue) / 100 : discountValue;

      return {
        orderSubtotal: order.subtotal - discountPrice
      };
    }

    if (discount.type === DiscountType.PRODUCT) {
      const { variants } = discount.metadata as ProductDiscountMetadata;
      const { discountValueType, discountValue } = discount;

      const linesWithVariants = order.lines.filter(line =>
        variants.includes(line.productVariantId)
      );

      const updatedLines = linesWithVariants.map(line => {
        const isPercentage = discountValueType === DiscountValueType.PERCENTAGE;
        const discountPrice = isPercentage ? (line.lineTotal * discountValue) / 100 : discountValue;

        return {
          lineId: line.id,
          linePrice: line.lineTotal - discountPrice
        };
      });

      return {
        lines: {
          details: updatedLines,
          total: updatedLines.reduce((acc, line) => acc + line.linePrice, 0)
        }
      };
    }

    if (discount.type === DiscountType.SHIPPING && order.shipment) {
      const isPercentage = discount.discountValueType === DiscountValueType.PERCENTAGE;
      const discountPrice = isPercentage
        ? (order.shipment.amount * discount.discountValue) / 100
        : discount.discountValue;

      return {
        shipmentAmount: order.shipment.amount - discountPrice
      };
    }

    if (discount.type === DiscountType.BUY_X_GET_Y) {
      const { get } = discount.metadata as BuyXGetYDiscountMetadata;

      const linesWithVariants = order.lines.filter(line =>
        get.variants.includes(line.productVariantId)
      );

      const updatedLines = linesWithVariants.map(line => {
        const isPercentage = discount.discountValueType === DiscountValueType.PERCENTAGE;
        const discountPrice = isPercentage
          ? (line.lineTotal * discount.discountValue) / 100
          : discount.discountValue;

        return {
          lineId: line.id,
          linePrice: line.lineTotal - discountPrice
        };
      });

      return {
        lines: {
          details: updatedLines,
          total: updatedLines.reduce((acc, line) => acc + line.linePrice, 0)
        }
      };
    }

    return {
      orderSubtotal: order.subtotal
    };
  }

  private getActiveDiscounts(order: OrderForDiscount): ActiveDiscount[] {
    const orderLevelDiscounts = order.activeDiscounts as unknown as ActiveDiscount[];
    const shipmentLevelDiscounts = order.shipment
      ? (order.shipment.activeDiscounts as unknown as ActiveDiscount[])
      : [];
    const orderLineLevelDiscounts = order.lines.flatMap(
      line => line.activeDiscounts as unknown as ActiveDiscount[]
    );

    return [...orderLevelDiscounts, ...(shipmentLevelDiscounts ?? []), ...orderLineLevelDiscounts];
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

    if (action === 'modify_discounts') {
      return order.state === OrderState.MODIFYING;
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
    return this._create({});
  }

  /**
   * Create an order with a line
   */
  private async createOrderWithLine(variant: Variant, quantity: number) {
    const unitPrice = variant.salePrice;
    const linePrice = unitPrice * quantity;

    return await this._create({
      lines: {
        create: {
          productVariantId: variant.id,
          quantity: quantity,
          lineSubtotal: linePrice,
          lineTotal: linePrice,
          unitPrice
        }
      },
      total: linePrice,
      subtotal: linePrice,
      totalQuantity: quantity
    });
  }

  private async _create(input: Prisma.OrderCreateInput) {
    const order = await this.prisma.order.create({
      data: input,
      include: { shipment: true, customer: true, lines: { include: { productVariant: true } } }
    });

    return await this.applyDiscounts(order, []);
  }

  /**
   * @description
   * Calculate the order prices before applying discounts
   */
  private calculateOrderPricesBeforeDiscounts(orderParam: OrderForDiscount): OrderForDiscount {
    const order = { ...orderParam };

    for (const line of order.lines) {
      line.lineTotal = line.lineSubtotal;
    }
    order.subtotal = order.lines.reduce((acc, line) => acc + line.lineTotal, 0);

    if (order.shipment) {
      order.shipment.total = order.shipment.amount;
    }

    order.total = order.subtotal + (order.shipment?.amount ?? 0);

    return {
      ...order,
      activeDiscounts: [],
      lines: order.lines.map(line => ({
        ...line,
        activeDiscounts: []
      })),
      ...(order.shipment && { shipment: { ...order.shipment, activeDiscounts: [] } })
    };
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
  | 'modify_discounts'
  | 'mark_as_shipped'
  | 'mark_as_delivered'
  | 'cancel';

type DiscountPrice = {
  orderSubtotal?: number;
  shipmentAmount?: number;
  lines?: {
    details: { lineId: ID; linePrice: number }[];
    total: number;
  };
};

export type OrderForDiscount = Order & {
  shipment: Shipment | null;
  customer: Customer | null;
  lines: (OrderLine & { productVariant: Variant })[];
};
