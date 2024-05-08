import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { orderGrpcConfig } from '../config/grpc.config';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';

@Module({
  imports: [ClientsModule.registerAsync([orderGrpcConfig])],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
