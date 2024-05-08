import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../common/types/enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { StatusResponse } from '../common/entities/status-response.entity';

import { MenuItemService } from './menu-item.service';
import { MenuItem } from './entities/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { ChangeMenuItemPositionDto } from './dto/change-menu-item-position.dto';

@Resolver()
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(GqlAuthGuard, RolesGuard)
export class MenuItemResolver {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Query(() => [MenuItem])
  async findAllByCategoryId(@Args('id') id: string) {
    return this.menuItemService.findAllByCategoryId(id);
  }

  @Query(() => MenuItem)
  async menuItem(@Args('id') id: string) {
    return this.menuItemService.findById(id);
  }

  @Mutation(() => MenuItem)
  async createMenuItem(
    @Args('createMenuItemDto') createMenuItemDto: CreateMenuItemDto,
  ) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Mutation(() => MenuItem)
  async updateMenuItem(
    @Args('updateMenuItemDto') updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemService.update(updateMenuItemDto);
  }

  @Mutation(() => MenuItem)
  async changeMenuItemPosition(
    @Args('changeMenuItemPositionDto')
    changeMenuItemPositionDto: ChangeMenuItemPositionDto,
  ) {
    return this.menuItemService.changePosition(changeMenuItemPositionDto);
  }

  @Mutation(() => StatusResponse)
  async deleteMenuItem(@Args('id') id: string) {
    return this.menuItemService.remove(id);
  }
}
