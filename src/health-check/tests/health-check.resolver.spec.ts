import { Test, TestingModule } from '@nestjs/testing';

import { HealthCheckResolver } from '../health-check.resolver';
import { HealthCheckService } from '../health-check.service';

describe('HealthCheckResolver', () => {
  let resolver: HealthCheckResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthCheckResolver,
        HealthCheckService,
        {
          provide: 'MENU_HEALTH_CHECK_SERVICE',
          useValue: {},
        },
        {
          provide: 'USER_HEALTH_CHECK_SERVICE',
          useValue: {},
        },
        {
          provide: 'STORE_HEALTH_CHECK_SERVICE',
          useValue: {},
        },
        {
          provide: 'ORDER_HEALTH_CHECK_SERVICE',
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<HealthCheckResolver>(HealthCheckResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
