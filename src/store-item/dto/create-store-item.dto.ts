import {
  IsDefined,
  IsNotEmptyObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Field, InputType, Int } from '@nestjs/graphql';

import { LanguageCode } from '../../common/types/enums';

@InputType()
class StoreCategoryId {
  @Field()
  @IsUUID()
  id: string;
}
@InputType()
export class CreateStoreItemDto {
  @Field()
  slug: string;

  @Field(() => LanguageCode)
  language: LanguageCode;

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

  @Field({ nullable: true })
  toOrder: boolean;

  @Field({ nullable: true })
  hidden: boolean;

  @Field(() => Int, { defaultValue: 0 })
  position: number;

  @Field(() => StoreCategoryId)
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreCategoryId)
  category: StoreCategoryId;
}
