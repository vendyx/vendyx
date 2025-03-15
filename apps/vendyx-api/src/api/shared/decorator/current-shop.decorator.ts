import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Shop } from '@prisma/client';

export const CurrentShop = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const headers = GqlExecutionContext.create(ctx).getContext().req.headers;

  return {
    id: headers.x_vendyx_shop_id
  };
});

export type TCurrentShop = Pick<Shop, 'id'>;
