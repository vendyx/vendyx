'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars/scalars.type';
import { OrderService } from '@/api/services/order.service';

export const markOrderAsReadyForPickup = async (orderId: ID) => {
  const result = await OrderService.markAsReadyForPickup(orderId);

  if (!result.success) {
    return { error: result.error };
  }

  revalidateTag(OrderService.Tags.order(result.orderId));
};
