import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleTypes } from '../common/types/enums';
import { HasRoles } from '../auth/decorators/roles.decorator';

import { StoreCategoryService } from './store-category.service';
import { StoreCategory } from './entities/store-category.entity';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import { StatusResponse } from '../common/entities/status-response.entity';

@Resolver()
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(GqlAuthGuard, RolesGuard)
export class StoreCategoryResolver {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Query(() => [StoreCategory])
  async findAll(): Promise<{ storeCategoryList: StoreCategory[] }> {
    return this.storeCategoryService.findAll();
  }

  @Query(() => StoreCategory)
  async findById(@Args('id') id: string): Promise<StoreCategory> {
    return this.storeCategoryService.findById(id);
  }

  @Mutation(() => StoreCategory)
  async create(
    @Args('createMenuCategoryDto')
    createMenuCategoryDto: CreateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.create(createMenuCategoryDto);
  }

  @Mutation(() => StoreCategory)
  async update(
    @Args('updateStoreCategoryDto')
    updateStoreCategoryDto: UpdateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.update(updateStoreCategoryDto);
  }

  @Mutation(() => StatusResponse)
  async delete(@Args('id') id: string): Promise<StatusResponse> {
    return this.storeCategoryService.delete(id);
  }
}
