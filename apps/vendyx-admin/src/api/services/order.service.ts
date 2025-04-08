import { getFragmentData } from '../codegen';
import {
  type MarkOrderAsShippedInput,
  type OrderErrorCode,
  type OrderListInput
} from '../codegen/graphql';
import { getOrderError } from '../errors/order.errors';
import {
  CANCEL_ORDER_MUTATION,
  COMMON_ORDER_FRAGMENT,
  GET_ALL_ORDERS_QUERY,
  GET_ORDER_BY_ID_QUERY,
  MARK_ORDER_AS_DELIVERED_MUTATION,
  MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION,
  MARK_ORDER_AS_SHIPPED_MUTATION
} from '../operations/order.operations';
import { type ID } from '../scalars/scalars.type';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const OrderService = {
  Tags: {
    orders: 'orders',
    order: (id: string) => `orders-${id}`
  },

  async getAll(input?: OrderListInput) {
    const { orders } = await serviceGqlFetcher(
      GET_ALL_ORDERS_QUERY,
      { input },
      { tags: [OrderService.Tags.orders] }
    );

    return orders;
  },

  async getById(id: ID) {
    const result = await serviceGqlFetcher(
      GET_ORDER_BY_ID_QUERY,
      { orderId: id },
      { tags: [OrderService.Tags.order(id)] }
    );

    const order = getFragmentData(COMMON_ORDER_FRAGMENT, result.order);

    return order;
  },

  async markAsShipped(orderId: ID, input: MarkOrderAsShippedInput): Promise<OrderResult> {
    const {
      markOrderAsShipped: { apiErrors, order }
    } = await serviceGqlFetcher(MARK_ORDER_AS_SHIPPED_MUTATION, { orderId, input });

    const error = getOrderError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, orderId: order?.id ?? '' };
  },

  async markAsReadyForPickup(orderId: ID): Promise<OrderResult> {
    const {
      markAsReadyForPickup: { apiErrors, order }
    } = await serviceGqlFetcher(MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION, { orderId });

    const error = getOrderError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, orderId: order?.id ?? '' };
  },

  async markAsDelivered(orderId: ID): Promise<OrderResult> {
    const {
      markOrderAsDelivered: { apiErrors, order }
    } = await serviceGqlFetcher(MARK_ORDER_AS_DELIVERED_MUTATION, { orderId });

    const error = getOrderError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, orderId: order?.id ?? '' };
  },

  async cancel(orderId: ID): Promise<OrderResult> {
    const {
      cancelOrder: { apiErrors, order }
    } = await serviceGqlFetcher(CANCEL_ORDER_MUTATION, { orderId });

    const error = getOrderError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, orderId: order?.id ?? '' };
  }
};

type OrderResult =
  | {
      success: true;
      orderId: ID;
    }
  | {
      success: false;
      error: string;
      errorCode: OrderErrorCode;
    };
