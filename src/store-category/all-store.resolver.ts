import { Args, Query, Resolver } from '@nestjs/graphql';

import { StoreCategoryService } from './store-category.service';
import { StoreCategory } from './entities/store-category.entity';
import { LanguageCode } from '../common/types/enums';

@Resolver()
export class AllStoreResolver {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Query(() => [StoreCategory])
  async getStoreByLanguage(
    @Args('language') language: LanguageCode,
  ): Promise<StoreCategory[]> {
    return this.storeCategoryService.findByLanguage(language);
  }
}
