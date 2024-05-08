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
class MenuCategoryId {
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
@InputType()
export class CreateMenuItemDto {
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

  @Field()
  @IsNotEmpty()
  @IsString()
  price: string;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @Field(() => Int, { defaultValue: 0 })
  @IsNumber()
  position: number;

  @Field(() => MenuCategoryId)
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => MenuCategoryId)
  menuCategory: MenuCategoryId;
}
