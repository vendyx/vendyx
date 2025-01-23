import { Module } from '@nestjs/common';

import { AddressService } from './address/address.service';
import { AssetService } from './asset/asset.service';
import { CollectionService } from './collection/collection.service';
import { CountryService } from './country/country.service';
import { CustomerService } from './customer/customer.service';
import { MetricsService } from './metrics/metrics.service';
import { OptionService } from './option/option.service';
import { OrderService } from './order/order.service';
import { PaymentMethodService } from './payment-method/payment-method.service';
import { ProductService } from './product/product.service';
import { ShippingMethodService } from './shipping-method/shipping-method.service';
import { ShopService } from './shop/shop.service';
import { UserService } from './user/user.service';
import { VariantService } from './variant/variant.service';
import { ZoneService } from './zone/zone.service';

import { AuthModule } from '@/auth/auth.module';
import { PaymentModule } from '@/payment/payment.module';
import { SecurityModule } from '@/security/security.module';
import { ShipmentModule } from '@/shipments/shipment.module';
import { StorageModule } from '@/storage/storage.module';

const SERVICES = [
  UserService,
  ShopService,
  ProductService,
  VariantService,
  OptionService,
  AssetService,
  PaymentMethodService,
  ShippingMethodService,
  ZoneService,
  CountryService,
  OrderService,
  CustomerService,
  MetricsService,
  CollectionService,
  AddressService
];

@Module({
  imports: [AuthModule, StorageModule, ShipmentModule, PaymentModule, SecurityModule],
  providers: [...SERVICES],
  exports: [...SERVICES]
})
export class BusinessModule {}
