import { Test, TestingModule } from '@nestjs/testing';

import { StoreItemImageResolver } from '../store-item-image.resolver';
import { StoreItemImageService } from '../store-item-image.service';
import { FileUploadService } from '../../file-upload/file-upload.service';

describe('StoreItemImageResolver', () => {
  let resolver: StoreItemImageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreItemImageResolver,
        StoreItemImageService,
        {
          provide: FileUploadService,
          useValue: {},
        },
        {
          provide: 'STORE_ITEM_IMAGE_SERVICE',
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<StoreItemImageResolver>(StoreItemImageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
