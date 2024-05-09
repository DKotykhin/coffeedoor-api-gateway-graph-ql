import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleTypes } from '../common/types/enums';
import { HasRoles } from '../auth/decorators/roles.decorator';

import { StoreItemService } from './store-item.service';
import { StoreItem } from './entities/store-item.entity';
import { CreateStoreItemDto } from './dto/create-store-item.dto';
import { UpdateStoreItemDto } from './dto/update-store-item.dto';
import { StatusResponse } from '../common/entities/status-response.entity';

@Resolver()
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(GqlAuthGuard, RolesGuard)
export class StoreItemResolver {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Query(() => [StoreItem])
  async getStoreItemsByCategoryId(
    @Args('categoryId') categoryId: string,
  ): Promise<StoreItem[]> {
    return this.storeItemService.findByCategoryId(categoryId);
  }

  @Query(() => StoreItem)
  async getStoreItemBySlug(@Args('slug') slug: string): Promise<StoreItem> {
    return this.storeItemService.findBySlug(slug);
  }

  @Mutation(() => StoreItem)
  async createStoreItem(
    @Args('createStoreItemDto') createStoreItemDto: CreateStoreItemDto,
  ): Promise<StoreItem> {
    return this.storeItemService.create(createStoreItemDto);
  }

  @Mutation(() => StoreItem)
  async updateStoreItem(
    @Args('updateStoreItemDto') updateStoreItemDto: UpdateStoreItemDto,
  ): Promise<StoreItem> {
    return this.storeItemService.update(updateStoreItemDto);
  }

  @Mutation(() => StatusResponse)
  async deleteStoreItem(@Args('slug') slug: string): Promise<StatusResponse> {
    return this.storeItemService.delete(slug);
  }
}
