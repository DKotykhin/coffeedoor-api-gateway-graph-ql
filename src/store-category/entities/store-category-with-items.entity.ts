import { Field, ObjectType } from '@nestjs/graphql';

import { StoreItem } from '../../store-item/entities/store-item.entity';
import { StoreCategory } from './store-category.entity';

@ObjectType()
export class StoreCategoryWithItems extends StoreCategory {
  @Field(() => [StoreItem], { nullable: true })
  storeItems: StoreItem[];
}
