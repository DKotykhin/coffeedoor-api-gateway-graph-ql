import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
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
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int, { nullable: true })
  weight: number;

  @Field(() => OrderId)
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OrderId)
  order: OrderId;
}
