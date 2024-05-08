import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType, Int } from '@nestjs/graphql';

import { CreateMenuCategoryDto } from './create-menu-category.dto';

@InputType()
export class UpdateMenuCategoryDto extends PartialType(CreateMenuCategoryDto) {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
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
  image: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  position: number;
}
