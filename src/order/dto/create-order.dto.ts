import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsMobilePhone,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

import { DeliveryWay, OrderStatus } from '../../common/types/enums';

@InputType()
class UserOrder {
  @Field()
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  userName: string;

  @Field()
  @IsString()
  @Length(10, 13, { message: 'Phone must be between 10 and 13 characters' })
  @IsMobilePhone('uk-UA')
  phoneNumber: string;

  @Field({ nullable: true })
  @IsString()
  userId: string;

  @Field(() => DeliveryWay, { nullable: true })
  @IsEnum(DeliveryWay)
  deliveryWay: DeliveryWay | string;

  @Field(() => OrderStatus, { nullable: true })
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus | string;

  @Field({ nullable: true })
  @IsString()
  @Length(2, 200, { message: 'Address must be between 2 and 200 characters' })
  deliveryAddress: string;

  @Field({ nullable: true })
  @IsString()
  @Length(2, 500, { message: 'Address must be between 2 and 500 characters' })
  comment: string;
}

@InputType()
class UserOrderItem {
  @Field()
  slug: string;

  @Field()
  categoryTitle: string;

  @Field()
  itemTitle: string;

  @Field(() => Int, { defaultValue: 0 })
  @IsPositive()
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsPositive()
  quantity: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  weight: number;
}

@InputType()
export class CreateOrderItemDto {
  @Field(() => UserOrder)
  userOrder: UserOrder;

  @Field(() => [UserOrderItem])
  orderItems: UserOrderItem[];
}
