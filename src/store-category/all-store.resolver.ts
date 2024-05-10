import { Args, Query, Resolver } from '@nestjs/graphql';

import { LanguageCode } from '../common/types/enums';
import { StoreCategoryService } from './store-category.service';
import { StoreCategoryWithItems } from './entities/store-category-with-items.entity';

@Resolver()
export class AllStoreResolver {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Query(() => [StoreCategoryWithItems])
  async getStoreByLanguage(
    @Args('language') language: LanguageCode,
  ): Promise<StoreCategoryWithItems[]> {
    return this.storeCategoryService.findByLanguage(language);
  }
}
