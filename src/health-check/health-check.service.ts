import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  HEALTH_CHECK_SERVICE_NAME,
  HealthCheckClient,
  HealthCheckResponse,
} from './health-check.pb';
import { HealthCheck } from './entities/health-check.entity';

@Injectable()
export class HealthCheckService implements OnModuleInit {
  private menuHealthCheckService: HealthCheckClient;
  private menuService: HealthCheckResponse;
  private storeHealthCheckService: HealthCheckClient;
  private storeService: HealthCheckResponse;
  private userHealthCheckService: HealthCheckClient;
  private userService: HealthCheckResponse;
  private orderHealthCheckService: HealthCheckClient;
  private orderService: HealthCheckResponse;
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
    try {
      this.menuService = await firstValueFrom(
        this.menuHealthCheckService.check({}),
      );
    } catch (error) {
      this.menuService = { status: 0 };
    }

    try {
      this.storeService = await firstValueFrom(
        this.storeHealthCheckService.check({}),
      );
    } catch (error) {
      this.storeService = { status: 0 };
    }

    try {
      this.userService = await firstValueFrom(
        this.userHealthCheckService.check({}),
      );
    } catch (error) {
      this.userService = { status: 0 };
    }

    try {
      this.orderService = await firstValueFrom(
        this.orderHealthCheckService.check({}),
      );
    } catch (error) {
      this.orderService = { status: 0 };
    }

    return {
      menuService: this.menuService,
      userService: this.userService,
      storeService: this.storeService,
      orderService: this.orderService,
    };
  }
}
