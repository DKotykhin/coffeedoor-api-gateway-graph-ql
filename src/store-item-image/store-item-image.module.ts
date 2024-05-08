import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { FileUploadService } from '../file-upload/file-upload.service';
import { storeItemImageGrpcConfig } from '../config/grpc.config';

import { StoreItemImageService } from './store-item-image.service';
import { StoreItemImageResolver } from './store-item-image.resolver';

@Module({
  imports: [ClientsModule.registerAsync([storeItemImageGrpcConfig])],
  providers: [StoreItemImageResolver, StoreItemImageService, FileUploadService],
})
export class StoreItemImageModule {}
