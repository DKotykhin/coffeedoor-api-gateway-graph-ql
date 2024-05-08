import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStoreItemDto {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
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

  @Field({ nullable: true })
  @IsOptional()
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

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  position: number;
}
