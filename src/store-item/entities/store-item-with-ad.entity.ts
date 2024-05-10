import { Field, ObjectType } from '@nestjs/graphql';
import { StoreItemWithImages } from './store-item-with-images.entity';

@ObjectType()
export class StoreItemWithAd {
  @Field(() => StoreItemWithImages, { nullable: true })
  storeItem: StoreItemWithImages;

  @Field(() => [StoreItemWithImages], { nullable: true })
  adList: StoreItemWithImages[];
}
