import { Field, ObjectType } from '@nestjs/graphql';

import { StoreItem } from '../../store-item/entities/store-item.entity';

@ObjectType()
export class StoreItemImage {
  @Field()
  image: string;

  @Field({ defaultValue: 1 })
  position: number;

  @Field(() => StoreItem)
  storeItem: {
    slug: string;
  };
}
