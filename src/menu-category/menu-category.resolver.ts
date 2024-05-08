import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RoleTypes } from '../common/types/enums';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

import { MenuCategoryService } from './menu-category.service';
import { MenuCategory } from './entities/menu-category.entity';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { ChangeMenuCategoryPositionDto } from './dto/change-menu-category-position.dto';

@Resolver()
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(GqlAuthGuard, RolesGuard)
export class MenuCategoryResolver {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Query(() => [MenuCategory])
  async menuCategories() {
    return this.menuCategoryService.findAll();
  }

  @Query(() => MenuCategory)
  async menuCategory(@Args('id') id: string) {
    return this.menuCategoryService.findById(id);
  }

  @Mutation(() => MenuCategory)
  async createMenuCategory(
    @Args('createMenuCategoryDto') createMenuCategoryDto: CreateMenuCategoryDto,
  ) {
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @Mutation(() => MenuCategory)
  async updateMenuCategory(
    @Args('updateMenuCategoryDto') updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    return this.menuCategoryService.update(updateMenuCategoryDto);
  }

  @Mutation(() => MenuCategory)
  async changePosition(
    @Args('changeMenuCategoryPositionDto')
    changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ) {
    return this.menuCategoryService.changePosition(
      changeMenuCategoryPositionDto,
    );
  }

  @Mutation(() => MenuCategory)
  async deleteMenuCategory(@Args('id') id: string) {
    return this.menuCategoryService.remove(id);
  }
}
