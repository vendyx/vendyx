import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import { BusinessModule } from '@/business/business.module';
import { PaymentModule } from '@/payment/payment.module';
import { ShipmentModule } from '@/shipments/shipment.module';

import { COMMON_RESOLVERS } from '../shared/common-resolvers';
import { GraphqlApiModule, SHARED_SCHEMA_PATH } from '../shared/graphql-api.module';
import { AddressResolver } from './resolvers/address.resolver';
import { CollectionResolver } from './resolvers/collection.resolver';
import { CountryResolver } from './resolvers/country.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { FavoriteResolver } from './resolvers/favorite.resolver';
import { OrderResolver } from './resolvers/order.resolver';
import { ProductResolver } from './resolvers/product.resolver';

const SHOP_API_SCHEMA_PATH = './src/api/shop/gql/**/*.gql';

@Module({})
export class ShopApiModule {
  static register(): DynamicModule {
    return {
      ...GraphqlApiModule.register({
        include: [ShopModule],
        path: '/shop-api',
        typePaths: [
          ...[SHARED_SCHEMA_PATH, SHOP_API_SCHEMA_PATH].map(p => path.join(process.cwd(), p))
        ]
      })
    };
  }
}

@Module({
  imports: [BusinessModule, ShipmentModule, PaymentModule],
  providers: [
    ...COMMON_RESOLVERS,
    ProductResolver,
    OrderResolver,
    CustomerResolver,
    CollectionResolver,
    CountryResolver,
    AddressResolver,
    FavoriteResolver
  ]
})
class ShopModule {}
