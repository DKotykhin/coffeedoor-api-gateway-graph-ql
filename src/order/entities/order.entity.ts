import { Field, ObjectType } from '@nestjs/graphql';

import { OrderItem } from '../../order-item/entities/order-item.entity';
import { DeliveryWay, OrderStatus } from '../../common/types/enums';

@ObjectType()
export class Order {
  @Field()
  id: string;

  @Field({ nullable: true })
  userName: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field(() => DeliveryWay, { defaultValue: DeliveryWay.PICKUP })
  deliveryWay: DeliveryWay | string;

  @Field({ nullable: true })
  deliveryAddress: string;

  @Field(() => OrderStatus, { defaultValue: OrderStatus.NEW })
  orderStatus: OrderStatus | string;

  @Field({ nullable: true })
  comment: string;

  @Field({ defaultValue: 0 })
  totalSum: number;

  @Field({ defaultValue: 0 })
  averageSum: number;

  @Field({ defaultValue: 0 })
  totalQuantity: number;

  @Field(() => [OrderItem], { nullable: true })
  orderItem: OrderItem[];
}
