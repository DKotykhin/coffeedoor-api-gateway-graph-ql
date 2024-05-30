import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  HEALTH_CHECK_SERVICE_NAME,
  HealthCheckClient,
} from './health-check.pb';
import { HealthCheck } from './entities/health-check.entity';

@Injectable()
export class HealthCheckService implements OnModuleInit {
  private menuHealthCheckService: HealthCheckClient;
  private storeHealthCheckService: HealthCheckClient;
  private userHealthCheckService: HealthCheckClient;
  private orderHealthCheckService: HealthCheckClient;
  protected readonly logger = new Logger(HealthCheckService.name);
  constructor(
    @Inject('MENU_HEALTH_CHECK_SERVICE')
    private readonly menuHealthCheckClient: ClientGrpc,
    @Inject('STORE_HEALTH_CHECK_SERVICE')
    private readonly storeHealthCheckClient: ClientGrpc,
    @Inject('USER_HEALTH_CHECK_SERVICE')
    private readonly userHealthCheckClient: ClientGrpc,
    @Inject('ORDER_HEALTH_CHECK_SERVICE')
    private readonly orderHealthCheckClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.menuHealthCheckService = this.menuHealthCheckClient.getService(
      HEALTH_CHECK_SERVICE_NAME,
    );
    this.userHealthCheckService = this.userHealthCheckClient.getService(
      HEALTH_CHECK_SERVICE_NAME,
    );
    this.storeHealthCheckService = this.storeHealthCheckClient.getService(
      HEALTH_CHECK_SERVICE_NAME,
    );
    this.orderHealthCheckService = this.orderHealthCheckClient.getService(
      HEALTH_CHECK_SERVICE_NAME,
    );
  }

  async checkHealth(): Promise<HealthCheck> {
    const checkServiceHealth = async (
      service: HealthCheckClient,
      serviceName: string,
    ) => {
      try {
        return await firstValueFrom(service.check({}));
      } catch (error) {
        this.logger.error(`${serviceName} service health check failed`);
        return { status: 0 };
      }
    };

    const [menuService, storeService, userService, orderService] =
      await Promise.all([
        checkServiceHealth(this.menuHealthCheckService, 'Menu'),
        checkServiceHealth(this.storeHealthCheckService, 'Store'),
        checkServiceHealth(this.userHealthCheckService, 'User'),
        checkServiceHealth(this.orderHealthCheckService, 'Order'),
      ]);

    return {
      menuService,
      userService,
      storeService,
      orderService,
    };
  }
}
