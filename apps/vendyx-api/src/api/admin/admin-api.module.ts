import * as path from 'path';

import { DynamicModule, Module } from '@nestjs/common';

import { CollectionResolver } from './resolvers/collection.resolver';
import { CountryResolver } from './resolvers/country.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { MetricsResolver } from './resolvers/metrics.resolver';
import { OptionResolver } from './resolvers/option.resolver';
import { OrderResolver } from './resolvers/order.resolver';
import { PaymentMethodResolver } from './resolvers/payment-method.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { ShippingMethodResolver } from './resolvers/shipping-method.resolver';
import { ShopResolver } from './resolvers/shop.resolver';
import { StateResolver } from './resolvers/state.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { VariantResolver } from './resolvers/variant.resolver';
import { ZoneResolver } from './resolvers/zone.resolver';
import { COMMON_RESOLVERS } from '../shared/common-resolvers';
import { GraphqlApiModule, SHARED_SCHEMA_PATH } from '../shared/graphql-api.module';

import { BusinessModule } from '@/business/business.module';
import { SecurityModule } from '@/security/security.module';
import { ShipmentModule } from '@/shipments/shipment.module';

const ADMIN_API_SCHEMA_PATH = './src/api/admin/gql/**/*.gql';

@Module({})
export class AdminApiModule {
  static register(): DynamicModule {
    return {
      ...GraphqlApiModule.register({
        include: [AdminModule],
        path: '/admin-api',
        typePaths: [
          ...[SHARED_SCHEMA_PATH, ADMIN_API_SCHEMA_PATH].map(p => path.join(process.cwd(), p))
        ]
      })
    };
  }
}

@Module({
  imports: [SecurityModule, ShipmentModule, BusinessModule],
  providers: [
    ...COMMON_RESOLVERS,
    UserResolver,
    ShopResolver,
    ProductResolver,
    VariantResolver,
    OptionResolver,
    PaymentMethodResolver,
    ShippingMethodResolver,
    CountryResolver,
    ZoneResolver,
    StateResolver,
    OrderResolver,
    CustomerResolver,
    MetricsResolver,
    CollectionResolver
  ]
})
class AdminModule {}
