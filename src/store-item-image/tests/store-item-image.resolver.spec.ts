import { Test, TestingModule } from '@nestjs/testing';
import { StoreItemImageResolver } from '../store-item-image.resolver';
import { StoreItemImageService } from '../store-item-image.service';

describe('StoreItemImageResolver', () => {
  let resolver: StoreItemImageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreItemImageResolver, StoreItemImageService],
    }).compile();

    resolver = module.get<StoreItemImageResolver>(StoreItemImageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
