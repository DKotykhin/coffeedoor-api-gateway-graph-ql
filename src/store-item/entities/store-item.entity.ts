import { Field, ObjectType } from '@nestjs/graphql';

import { LanguageCode } from '../../common/types/enums';

@ObjectType()
export class StoreItem {
  @Field()
  slug: string;

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

  @Field(() => [String], { nullable: true })
  imageUrl?: string[];
}
