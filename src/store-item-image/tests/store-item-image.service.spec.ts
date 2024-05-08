import { Test, TestingModule } from '@nestjs/testing';

import { StoreItemImageService } from '../store-item-image.service';
import { FileUploadService } from '../../file-upload/file-upload.service';

describe('StoreItemImageService', () => {
  let service: StoreItemImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<StoreItemImageService>(StoreItemImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
