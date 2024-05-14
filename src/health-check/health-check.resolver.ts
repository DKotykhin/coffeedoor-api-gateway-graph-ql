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
    await this.healthCheckService.checkHealth();
  }
}
