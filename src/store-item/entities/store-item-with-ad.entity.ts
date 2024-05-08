import { Field, ObjectType } from '@nestjs/graphql';
import { StoreItem } from './store-item.entity';

@ObjectType()
export class StoreItemWithAd {
  @Field(() => StoreItem, { nullable: true })
  storeItem: StoreItem;

  @Field(() => [StoreItem], { nullable: true })
  adList: StoreItem[];
}
