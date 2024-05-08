import { Args, Query, Resolver } from '@nestjs/graphql';
import { ApiTags } from '@nestjs/swagger';

import { LanguageCode } from '../types/enums';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategory } from './entities/menu-category.entity';

@ApiTags('all-menu')
@Resolver()
export class AllMenuResolver {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Query(() => [MenuCategory])
  async findByLanguage(@Args('language') language: LanguageCode) {
    return this.menuCategoryService.findByLanguage(language);
  }
}
