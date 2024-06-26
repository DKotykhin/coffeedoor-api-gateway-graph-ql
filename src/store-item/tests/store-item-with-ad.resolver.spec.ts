import { Test, TestingModule } from '@nestjs/testing';

import { StoreItemService } from '../store-item.service';
import { StoreItemWithAdResolver } from '../store-item-with-ad.resolver';
import { FileUploadService } from '../../file-upload/file-upload.service';

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
        {
          provide: FileUploadService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<StoreItemWithAdResolver>(StoreItemWithAdResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
