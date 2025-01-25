import { createConfirmMail } from './confirm-email.template';
import { createCustomerRegisteredMail } from './customer-registered.template';
import { createOrderConfirmationTemplate } from './order-confirmation.template';
import { createOrderSentTemplate } from './order-sent.template';

export const EmailTemplates = {
  OrderConfirmation: createOrderConfirmationTemplate,
  CustomerRegistered: createCustomerRegisteredMail,
  ConfirmEmail: createConfirmMail,
  OrderSent: createOrderSentTemplate
};
