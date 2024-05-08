import { Test, TestingModule } from '@nestjs/testing';

import { StoreCategoryService } from '../store-category.service';
import { FileUploadService } from '../../file-upload/file-upload.service';

describe('StoreCategoryService', () => {
  let service: StoreCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreCategoryService,
        {
          provide: 'STORE_CATEGORY_SERVICE',
          useValue: {},
        },
        {
          provide: FileUploadService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StoreCategoryService>(StoreCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
