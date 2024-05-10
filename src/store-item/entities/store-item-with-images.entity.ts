import { Field, ObjectType } from '@nestjs/graphql';

import { StoreItem } from './store-item.entity';

@ObjectType()
export class StoreItemWithImages extends StoreItem {
  @Field(() => [String], { nullable: true })
  imageUrl?: string[];
}
