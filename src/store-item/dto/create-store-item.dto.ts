import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
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
  @IsNotEmpty()
  @IsString()
  slug: string;

  @Field(() => LanguageCode)
  @IsEnum(LanguageCode)
  language: LanguageCode;

  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  details: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sortKey: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sortValue: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tm: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  oldPrice: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  discount: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  weight: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  toOrder: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @Field(() => Int, { defaultValue: 0 })
  @IsNumber()
  position: number;

  @Field(() => StoreCategoryId)
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreCategoryId)
  category: StoreCategoryId;
}
