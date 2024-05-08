import { Test, TestingModule } from '@nestjs/testing';

import { StoreItemService } from '../store-item.service';
import { StoreItemWithAdResolver } from '../store-item-with-ad.resolver';

describe('StoreItemWithAdResolver', () => {
  let resolver: StoreItemWithAdResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreItemService,
        StoreItemWithAdResolver,
        {
          provide: 'STORE_ITEM_SERVICE',
          useValue: {},
        },
      ],
    })
      .overrideProvider(StoreItemService)
      .useValue({})
      .compile();

    resolver = module.get<StoreItemWithAdResolver>(StoreItemWithAdResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
