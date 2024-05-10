import { Field, ObjectType } from '@nestjs/graphql';

import { StoreCategory } from './store-category.entity';
import { StoreItemWithImages } from '../../store-item/entities/store-item-with-images.entity';

@ObjectType()
export class StoreCategoryWithItems extends StoreCategory {
  @Field(() => [StoreItemWithImages], { nullable: true })
  storeItems: StoreItemWithImages[];
}
