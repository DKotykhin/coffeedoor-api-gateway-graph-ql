import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

import { CreateMenuItemDto } from './create-menu-item.dto';

@InputType()
export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
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
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  price: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  position: number;
}
