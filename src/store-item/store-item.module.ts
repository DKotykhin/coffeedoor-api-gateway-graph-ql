import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeItemGrpcConfig } from '../config/grpc.config';
import { FileUploadService } from '../file-upload/file-upload.service';

import { StoreItemService } from './store-item.service';
import { StoreItemResolver } from './store-item.resolver';
import { StoreItemWithAdResolver } from './store-item-with-ad.resolver';

@Module({
  imports: [ClientsModule.registerAsync([storeItemGrpcConfig])],
  providers: [
    FileUploadService,
    StoreItemResolver,
    StoreItemService,
    StoreItemWithAdResolver,
  ],
})
export class StoreItemModule {}
