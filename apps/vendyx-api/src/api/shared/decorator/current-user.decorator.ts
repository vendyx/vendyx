import { createParamDecorator } from '@nestjs/common';

/**
 * Decorator to get the current user from the request.
 *
 * @warning This decorator should be used only in the /admin-api context.
 */
export const CurrentUser = createParamDecorator((_, { args: [, , ctx] }) => ctx.req.user);

export type TCurrentUser = {
  id: string;
  email: string;
  emailVerified: boolean;
};
