import { Module } from '@nestjs/common';

import { SendGridClient } from './clients/sendgrid-client';
import { MailCustomerListener } from './listeners/customer/mail-customer.listener';
import { MailCustomerService } from './listeners/customer/mail-customer.service';
import { MailOrderListener } from './listeners/order/mail-order.listener';
import { MailOrderService } from './listeners/order/mail-order.service';

import { BusinessModule } from '@/business/business.module';

@Module({
  imports: [BusinessModule],
  providers: [
    SendGridClient,
    MailOrderService,
    MailCustomerService,
    MailOrderListener,
    MailCustomerListener
  ]
})
export class MailModule {}
