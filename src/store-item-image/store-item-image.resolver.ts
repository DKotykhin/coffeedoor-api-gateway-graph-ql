import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleTypes } from '../common/types/enums';
import { HasRoles } from '../auth/decorators/roles.decorator';

import { StoreItemImageService } from './store-item-image.service';
import { StatusResponse } from '../common/entities/status-response.entity';

@Resolver()
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(GqlAuthGuard, RolesGuard)
export class StoreItemImageResolver {
  constructor(private readonly storeItemImageService: StoreItemImageService) {}

  @Mutation(() => StatusResponse)
  deleteStoreImage(@Args('image') image: string): Promise<StatusResponse> {
    return this.storeItemImageService.deleteStoreImage(image);
  }
}
