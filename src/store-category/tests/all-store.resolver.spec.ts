import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { StoreCategoryService } from '../store-category.service';
import { FileUploadService } from '../../file-upload/file-upload.service';
import { AllStoreResolver } from '../all-store.resolver';

describe('AllStoreResolver', () => {
  let resolver: AllStoreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllStoreResolver,
        StoreCategoryService,
        {
          provide: 'STORE_CATEGORY_SERVICE',
          useValue: {},
        },
        {
          provide: FileUploadService,
          useValue: {},
        },
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<AllStoreResolver>(AllStoreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
