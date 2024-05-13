import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsPositive,
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
  slug: string;

  @Field()
  categoryTitle: string;

  @Field()
  itemTitle: string;

  @Field(() => Int)
  @IsPositive()
  price: number;

  @Field(() => Int)
  @IsPositive()
  quantity: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  weight: number;

  @Field(() => OrderId)
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OrderId)
  order: OrderId;
}
