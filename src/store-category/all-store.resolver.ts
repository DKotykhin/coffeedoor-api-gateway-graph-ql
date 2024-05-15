import { Args, Query, Resolver } from '@nestjs/graphql';

import { LanguageDto } from '../common/_index';
import { StoreCategoryService } from './store-category.service';
import { StoreCategoryWithItems } from './entities/store-category-with-items.entity';

@Resolver()
export class AllStoreResolver {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Query(() => [StoreCategoryWithItems])
  async getStoreByLanguage(
    @Args('languageDto') languageDto: LanguageDto,
  ): Promise<StoreCategoryWithItems[]> {
    return this.storeCategoryService.findByLanguage(languageDto.language);
  }
}
