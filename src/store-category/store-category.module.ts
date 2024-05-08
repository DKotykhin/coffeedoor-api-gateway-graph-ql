import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeCategoryGrpcConfig } from '../config/grpc.config';
import { FileUploadService } from '../file-upload/file-upload.service';

import { StoreCategoryService } from './store-category.service';
import { StoreCategoryResolver } from './store-category.resolver';
import { AllStoreResolver } from './all-store.resolver';

@Module({
  imports: [ClientsModule.registerAsync([storeCategoryGrpcConfig])],
  providers: [
    AllStoreResolver,
    StoreCategoryResolver,
    StoreCategoryService,
    FileUploadService,
  ],
})
export class StoreCategoryModule {}
