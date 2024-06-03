import {
  IsDefined,
  IsEnum,
  IsNotEmptyObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Field, InputType, Int } from '@nestjs/graphql';

import { LanguageCode } from '../../common/types/enums';
import { IdDto } from '../../common/_index';

@InputType()
export class CreateStoreItemDto {
  @Field()
  slug: string;

  @Field(() => LanguageCode)
  @IsEnum(LanguageCode)
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
  @IsPositive()
  price: number;

  @Field({ nullable: true })
  @IsPositive()
  oldPrice: number;

  @Field({ nullable: true })
  discount: number;

  @Field({ nullable: true })
  @IsPositive()
  weight: number;

  @Field({ nullable: true })
  toOrder: boolean;

  @Field({ nullable: true })
  hidden: boolean;

  @Field(() => Int, { defaultValue: 0 })
  @IsPositive()
  position: number;

  @Field(() => IdDto)
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => IdDto)
  category: IdDto;
}
