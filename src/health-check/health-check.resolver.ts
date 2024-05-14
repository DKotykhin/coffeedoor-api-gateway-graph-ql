import { Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Cron } from '@nestjs/schedule';

import { HealthCheckService } from './health-check.service';
import { HealthCheck } from './entities/health-check.entity';

@Resolver()
export class HealthCheckResolver {
  constructor(private readonly healthCheckService: HealthCheckService) {}
  protected readonly logger = new Logger(HealthCheckResolver.name);

  @Query(() => HealthCheck)
  async healthCheck(): Promise<HealthCheck> {
    return this.healthCheckService.checkHealth();
  }

  @Cron('*/1 * * * *')
  async handleCron() {
    const healthCheck = await this.healthCheckService.checkHealth();
    if (healthCheck.menuService.status !== 1) {
      this.logger.error('Menu service health check failed');
    }
    if (healthCheck.storeService.status !== 1) {
      this.logger.error('Store service health check failed');
    }
    if (healthCheck.userService.status !== 1) {
      this.logger.error('User service health check failed');
    }
    if (healthCheck.orderService.status !== 1) {
      this.logger.error('Order service health check failed');
    }
  }
}
