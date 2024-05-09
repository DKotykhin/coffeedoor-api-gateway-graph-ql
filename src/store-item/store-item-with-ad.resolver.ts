import { Args, Query, Resolver } from '@nestjs/graphql';

import { StoreItemService } from './store-item.service';
import { StoreItemWithAd } from './entities/store-item-with-ad.entity';

@Resolver()
export class StoreItemWithAdResolver {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Query(() => StoreItemWithAd)
  async getStoreItemBySlugWithAd(
    @Args('slug') slug: string,
  ): Promise<StoreItemWithAd> {
    return this.storeItemService.findBySlugWithAd(slug);
  }
}
