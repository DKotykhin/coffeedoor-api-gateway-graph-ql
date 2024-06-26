import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../common/types/enums';
import { IdDto, StatusResponse } from '../common/_index';

import { StoreCategoryService } from './store-category.service';
import { StoreCategory } from './entities/store-category.entity';
import { StoreCategoryWithItems } from './entities/store-category-with-items.entity';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';

@Resolver()
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(GqlAuthGuard, RolesGuard)
export class StoreCategoryResolver {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Query(() => [StoreCategoryWithItems])
  async getAllStore(): Promise<StoreCategoryWithItems[]> {
    return this.storeCategoryService.findAll();
  }

  @Query(() => StoreCategoryWithItems)
  async getStoreCategoryById(
    @Args('idDto') idDto: IdDto,
  ): Promise<StoreCategoryWithItems> {
    return this.storeCategoryService.findById(idDto.id);
  }

  @Mutation(() => StoreCategory)
  async createStoreCategory(
    @Args('createStoreCategoryDto')
    createStoreCategoryDto: CreateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.create(createStoreCategoryDto);
  }

  @Mutation(() => StoreCategory)
  async updateStoreCategory(
    @Args('updateStoreCategoryDto')
    updateStoreCategoryDto: UpdateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.update(updateStoreCategoryDto);
  }

  @Mutation(() => StatusResponse)
  async deleteStoreCategory(
    @Args('idDto') idDto: IdDto,
  ): Promise<StatusResponse> {
    return this.storeCategoryService.delete(idDto.id);
  }
}
