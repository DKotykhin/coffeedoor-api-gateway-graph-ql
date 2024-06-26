import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { StoreCategoryResolver } from '../store-category.resolver';
import { StoreCategoryService } from '../store-category.service';
import { FileUploadService } from '../../file-upload/file-upload.service';

describe('StoreCategoryResolver', () => {
  let resolver: StoreCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreCategoryResolver,
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

    resolver = module.get<StoreCategoryResolver>(StoreCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
