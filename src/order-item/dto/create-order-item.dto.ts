import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

@InputType()
class OrderId {
  @Field()
  @IsUUID()
  id: string;
}

@InputType()
export class CreateOrderItem {
  @Field()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  categoryTitle: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  itemTitle: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  weight: number;

  @Field(() => OrderId)
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OrderId)
  order: OrderId;
}
