import { Query, Resolver } from '@nestjs/graphql';
import { ApiTags } from '@nestjs/swagger';

import { HealthCheckService } from './health-check.service';
import { HealthCheck } from './entities/health-check.entity';

@ApiTags('health-check')
@Resolver()
export class HealthCheckResolver {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Query(() => HealthCheck)
  async healthCheck(): Promise<HealthCheck> {
    return this.healthCheckService.checkHealth();
  }
}
