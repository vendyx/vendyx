import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ShopService } from '@/business/shop/shop.service';

@Injectable()
export class ShopApiKeyGuard implements CanActivate {
  constructor(private readonly shopService: ShopService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req;

    const shopId = req.headers.x_vendyx_shop_id;
    const shopApiKey = req.headers.x_vendyx_shop_api_key;

    if (!shopApiKey) {
      throw new UnauthorizedException('Missing shop API key');
    }

    if (!shopId) {
      throw new UnauthorizedException('Missing shop ID');
    }

    const { isValid, cause } = await this.shopService.validateShopApiKey(shopId, shopApiKey);

    if (!isValid) {
      throw new UnauthorizedException(cause);
    }

    return isValid;
  }
}
