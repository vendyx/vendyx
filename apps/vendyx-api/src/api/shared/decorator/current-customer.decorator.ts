import { createParamDecorator } from '@nestjs/common';
import { Customer } from 'prisma/prisma-client';

/**
 * Decorator to get the current customer from the request.
 *
 * @warning This decorator should be used only in the /shop-api context.
 */
export const CurrentCustomer = createParamDecorator((_, { args: [, , ctx] }) => ctx.req.user);

export type TCurrentCustomer = Pick<Customer, 'id' | 'email' | 'enabled'>;
