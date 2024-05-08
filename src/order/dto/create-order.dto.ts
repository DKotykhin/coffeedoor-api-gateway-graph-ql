import { Field, InputType } from '@nestjs/graphql';

import { DeliveryWay } from '../../common/types/enums';

@InputType()
class UserOrder {
  @Field()
  userName: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  userId?: string;

  @Field(() => DeliveryWay, { nullable: true })
  deliveryWay?: DeliveryWay | string;

  @Field({ nullable: true })
  deliveryAddress?: string;

  @Field({ nullable: true })
  comment?: string;
}

@InputType()
class UserOrderItem {
  @Field()
  slug: string;

  @Field()
  categoryTitle: string;

  @Field()
  itemTitle: string;

  @Field({ defaultValue: 0 })
  price: number;

  @Field({ defaultValue: 0 })
  quantity: number;

  @Field({ nullable: true })
  weight?: number;
}

@InputType()
export class CreateOrderItemDto {
  @Field()
  userOrder: UserOrder;

  @Field(() => [UserOrderItem])
  orderItems: UserOrderItem[];
}
