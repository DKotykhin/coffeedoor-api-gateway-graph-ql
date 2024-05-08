import { Field, ObjectType } from '@nestjs/graphql';

import { LanguageCode } from '../../common/types/enums';
import { StoreCategory } from '../../store-category/entities/store-category.entity';
import { StoreItemImage } from '../../store-item-image/entities/store-item-image.entity';

@ObjectType()
export class StoreItem {
  @Field()
  slug: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => LanguageCode)
  language: LanguageCode | string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  details: string;

  @Field({ nullable: true })
  sortKey: string;

  @Field({ nullable: true })
  sortValue: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  tm: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  oldPrice: number;

  @Field({ nullable: true })
  discount: number;

  @Field({ nullable: true })
  weight: number;

  @Field({ defaultValue: false })
  hidden: boolean;

  @Field({ defaultValue: 0 })
  position: number;

  @Field(() => StoreCategory, { nullable: true })
  category?: {
    id: string;
  };

  @Field(() => [StoreItemImage], { nullable: true })
  images?: StoreItemImage[];
}
