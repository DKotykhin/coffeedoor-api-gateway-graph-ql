import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeItemGrpcConfig } from '../config/grpc.config';
import { StoreItemService } from './store-item.service';
import { StoreItemResolver } from './store-item.resolver';

@Module({
  imports: [ClientsModule.registerAsync([storeItemGrpcConfig])],
  providers: [StoreItemResolver, StoreItemService],
})
export class StoreItemModule {}
