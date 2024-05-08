import { Test, TestingModule } from '@nestjs/testing';
import { OrderResolver } from '../order.resolver';
import { OrderService } from '../order.service';

describe('OrderResolver', () => {
  let resolver: OrderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderResolver,
        OrderService,
        {
          provide: 'ORDER_SERVICE',
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<OrderResolver>(OrderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
