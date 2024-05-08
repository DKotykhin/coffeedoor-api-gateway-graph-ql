import { Test, TestingModule } from '@nestjs/testing';
import { StoreCategoryResolver } from '../store-category.resolver';
import { StoreCategoryService } from '../store-category.service';

describe('StoreCategoryResolver', () => {
  let resolver: StoreCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreCategoryResolver, StoreCategoryService],
    }).compile();

    resolver = module.get<StoreCategoryResolver>(StoreCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
