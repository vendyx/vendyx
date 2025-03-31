import { CollectionFieldResolver } from './resolvers/collection-field.resolver';
import { CountryFieldResolver } from './resolvers/country-field.resolver';
import { CustomerFieldResolver } from './resolvers/customer-field.resolver';
import { OptionFieldResolver } from './resolvers/option-field.resolver';
import { OrderFieldResolver } from './resolvers/order-field.resolver';
import { OrderLineFieldResolver } from './resolvers/order-line-field.resolver';
import { ProductFieldResolver } from './resolvers/product-field.resolver';
import { ShipmentFieldResolver } from './resolvers/shipment-field.resolver';
import { VariantFieldResolver } from './resolvers/variant-field.resolver';

export const COMMON_RESOLVERS = [
  OrderFieldResolver,
  OrderLineFieldResolver,
  ProductFieldResolver,
  VariantFieldResolver,
  CustomerFieldResolver,
  OptionFieldResolver,
  CollectionFieldResolver,
  CountryFieldResolver,
  ShipmentFieldResolver
];
