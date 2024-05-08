import { Resolver } from '@nestjs/graphql';
import { StoreItemService } from './store-item.service';

@Resolver()
export class StoreItemResolver {
  constructor(private readonly storeItemService: StoreItemService) {}
}
