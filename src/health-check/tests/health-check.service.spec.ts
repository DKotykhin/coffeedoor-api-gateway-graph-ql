import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from '../health-check.service';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
