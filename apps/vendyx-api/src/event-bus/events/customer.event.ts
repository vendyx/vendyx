import { ID } from '@/persistence/types/scalars.type';

import { VendyxEvent } from './vendyx.event';

export enum CustomerEvent {
  REGISTERED = 'customer.registered'
}

/**
 * @description
 * Event that is emitted when a customer is registered via `createUser` mutation
 */
export class CustomerRegisteredEvent extends VendyxEvent {
  constructor(public readonly customerId: ID) {
    super(CustomerEvent.REGISTERED);
  }
}
