import { Field, InputType, Int } from '@nestjs/graphql';

import { DeliveryWay, OrderStatus } from '../../common/types/enums';

@InputType()
class UserOrder {
  @Field()
  userName: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  userId: string;

  @Field(() => DeliveryWay, { nullable: true })
  deliveryWay: DeliveryWay | string;

  @Field(() => OrderStatus, { nullable: true })
  orderStatus: OrderStatus | string;

  @Field({ nullable: true })
  deliveryAddress: string;

  @Field({ nullable: true })
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
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  quantity: number;

  @Field(() => Int, { nullable: true })
  weight: number;
}

@InputType()
export class CreateOrderItemDto {
  @Field(() => UserOrder)
  userOrder: UserOrder;

  @Field(() => [UserOrderItem])
  orderItems: UserOrderItem[];
}
