import { Args, Query, Resolver } from '@nestjs/graphql';

import { LanguageCode } from '../common/types/enums';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategory } from './entities/menu-category.entity';

@Resolver()
export class AllMenuResolver {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Query(() => [MenuCategory], { name: 'getMenuByLanguage' })
  async getMenuByLanguage(
    @Args('language') language: LanguageCode,
  ): Promise<MenuCategory[]> {
    return this.menuCategoryService.findByLanguage(language);
  }
}
