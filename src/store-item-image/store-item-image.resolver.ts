import { Resolver } from '@nestjs/graphql';
import { StoreItemImageService } from './store-item-image.service';

@Resolver()
export class StoreItemImageResolver {
  constructor(private readonly storeItemImageService: StoreItemImageService) {}
}
