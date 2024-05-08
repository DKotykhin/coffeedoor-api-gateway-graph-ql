import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import {
  menuHealthCheckGrpcConfig,
  orderHealthCheckGrpcConfig,
  storeHealthCheckGrpcConfig,
  userHealthCheckGrpcConfig,
} from '../config/grpc.config';
import { HealthCheckService } from './health-check.service';
import { HealthCheckResolver } from './health-check.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      menuHealthCheckGrpcConfig,
      userHealthCheckGrpcConfig,
      storeHealthCheckGrpcConfig,
      orderHealthCheckGrpcConfig,
    ]),
  ],
  providers: [HealthCheckResolver, HealthCheckService],
})
export class HealthCheckModule {}
