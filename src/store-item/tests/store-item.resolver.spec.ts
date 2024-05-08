import { Test, TestingModule } from '@nestjs/testing';
import { StoreItemResolver } from '../store-item.resolver';
import { StoreItemService } from '../store-item.service';

describe('StoreItemResolver', () => {
  let resolver: StoreItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreItemResolver,
        StoreItemService,
        {
          provide: 'STORE_ITEM_SERVICE',
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<StoreItemResolver>(StoreItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
