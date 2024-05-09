import { Args, Query, Resolver } from '@nestjs/graphql';

import { LanguageCode } from '../common/types/enums';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryWithItems } from './entities/menu-category-with-items.entity';

@Resolver()
export class AllMenuResolver {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Query(() => [MenuCategoryWithItems], { name: 'getMenuByLanguage' })
  async getMenuByLanguage(
    @Args('language') language: LanguageCode,
  ): Promise<MenuCategoryWithItems[]> {
    return this.menuCategoryService.findByLanguage(language);
  }
}
