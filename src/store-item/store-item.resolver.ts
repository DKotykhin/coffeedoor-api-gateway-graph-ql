import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../common/types/enums';
import { IdDto } from '../common/dto/id.dto';
import { StatusResponse } from '../common/entities/status-response.entity';

import { StoreItemService } from './store-item.service';
import { StoreItem } from './entities/store-item.entity';
import { CreateStoreItemDto } from './dto/create-store-item.dto';
import { UpdateStoreItemDto } from './dto/update-store-item.dto';
import { StoreItemWithImages } from './entities/store-item-with-images.entity';

@Resolver()
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(GqlAuthGuard, RolesGuard)
export class StoreItemResolver {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Query(() => [StoreItemWithImages])
  async getStoreItemsByCategoryId(
    @Args('categoryIdDto') categoryIdDto: IdDto,
  ): Promise<StoreItem[]> {
    return this.storeItemService.getStoreItemsByCategoryId(categoryIdDto.id);
  }

  @Query(() => StoreItemWithImages)
  async getStoreItemBySlug(@Args('slug') slug: string): Promise<StoreItem> {
    return this.storeItemService.getStoreItemBySlug(slug);
  }

  @Mutation(() => StoreItem)
  async createStoreItem(
    @Args('createStoreItemDto') createStoreItemDto: CreateStoreItemDto,
  ): Promise<StoreItem> {
    return this.storeItemService.createStoreItem(createStoreItemDto);
  }

  @Mutation(() => StoreItem)
  async updateStoreItem(
    @Args('updateStoreItemDto') updateStoreItemDto: UpdateStoreItemDto,
  ): Promise<StoreItem> {
    return this.storeItemService.updateStoreItem(updateStoreItemDto);
  }

  @Mutation(() => StatusResponse)
  async deleteStoreItem(@Args('slug') slug: string): Promise<StatusResponse> {
    return this.storeItemService.deleteStoreItem(slug);
  }
}
