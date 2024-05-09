import { Field, InputType, Int } from '@nestjs/graphql';

import { DeliveryWay, OrderStatus } from '../../common/types/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
class UserOrder {
  @Field()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Field({ nullable: true })
  @IsOptional()
  userId?: string;

  @Field(() => DeliveryWay, { nullable: true })
  @IsOptional()
  @IsEnum(DeliveryWay)
  deliveryWay?: DeliveryWay | string;

  @Field(() => OrderStatus, { defaultValue: OrderStatus.NEW })
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus | string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comment?: string;
}

@InputType()
class UserOrderItem {
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

  @Field(() => Int, { defaultValue: 0 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  weight?: number;
}

@InputType()
export class CreateOrderItemDto {
  @Field(() => UserOrder)
  @IsNotEmpty()
  userOrder: UserOrder;

  @Field(() => [UserOrderItem])
  @IsNotEmpty()
  orderItems: UserOrderItem[];
}
