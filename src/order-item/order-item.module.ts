import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { OrderItemService } from './order-item.service';
import { OrderItemResolver } from './order-item.resolver';
import { orderItemGrpcConfig } from '../config/grpc.config';

@Module({
  imports: [ClientsModule.registerAsync([orderItemGrpcConfig])],
  providers: [OrderItemResolver, OrderItemService],
})
export class OrderItemModule {}
