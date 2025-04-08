import { OrderState } from '@prisma/client';

export const ValidOrderTransitions = [
  /**
   * The payment has been added but the founds have not been transferred yet
   */
  [OrderState.MODIFYING, OrderState.PAYMENT_ADDED],
  /**
   * The payment has been authorized in one step and the founds have been transferred
   */
  [OrderState.MODIFYING, OrderState.PAYMENT_AUTHORIZED],
  /**
   * The payment has been authorized and the founds have been transferred
   */
  [OrderState.PAYMENT_ADDED, OrderState.PAYMENT_AUTHORIZED],
  /**
   * The order has been shipped
   */
  [OrderState.PAYMENT_AUTHORIZED, OrderState.SHIPPED],
  /**
   * The order is ready for customer to pick up in store
   */
  [OrderState.PAYMENT_AUTHORIZED, OrderState.READY_FOR_PICKUP],
  /**
   * The order has been picked up by the customer
   */
  [OrderState.READY_FOR_PICKUP, OrderState.DELIVERED],
  /**
   * The order has been delivered
   */
  [OrderState.SHIPPED, OrderState.DELIVERED]
];

/**
 * Parse order code to get the raw order code
 *
 * @example
 * const orderCode = '#0001'
 * const rawOrderCode = parseOrderCode(orderCode)
 * console.log(rawOrderCode) // 1
 */
export const parseOrderCode = (code: string) => {
  // if 0, or is NaN, return undefined, useful for filters, if there is not valid code, don't filter by it
  return Number(code.replace('#', '')) || undefined;
};

/**
 * Format order code to be displayed
 *
 * @example
 * const orderCode = 1
 * const formattedOrderCode = formatOrderCode(orderCode)
 * console.log(formattedOrderCode) // #0001
 */
export const formatOrderCode = (code: number) => {
  return `#${code.toString().padStart(4, '0')}`;
};
