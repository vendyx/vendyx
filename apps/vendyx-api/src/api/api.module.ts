import { Module } from '@nestjs/common';

import { AdminApiModule } from './admin/admin-api.module';
import { ShopApiModule } from './shop/shop-api.module';
import { UploadApiModule } from './upload/upload-api.module';

@Module({
  imports: [UploadApiModule, AdminApiModule.register(), ShopApiModule.register()]
})
export class ApiModule {}
