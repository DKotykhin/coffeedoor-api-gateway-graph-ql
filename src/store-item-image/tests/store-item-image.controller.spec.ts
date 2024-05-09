import { Test, TestingModule } from '@nestjs/testing';

import { StoreItemImageController } from '../store-item-image.controller';
import { StoreItemImageService } from '../store-item-image.service';
import { FileUploadService } from '../../file-upload/file-upload.service';

describe('StoreItemImageController', () => {
  let controller: StoreItemImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreItemImageController],
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

    controller = module.get<StoreItemImageController>(StoreItemImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
