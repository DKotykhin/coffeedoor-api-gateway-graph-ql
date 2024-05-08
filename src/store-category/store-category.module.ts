import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeCategoryGrpcConfig } from '../config/grpc.config';
import { FileUploadService } from '../file-upload/file-upload.service';

import { StoreCategoryService } from './store-category.service';
import { StoreCategoryResolver } from './store-category.resolver';

@Module({
  imports: [ClientsModule.registerAsync([storeCategoryGrpcConfig])],
  providers: [StoreCategoryResolver, StoreCategoryService, FileUploadService],
})
export class StoreCategoryModule {}
