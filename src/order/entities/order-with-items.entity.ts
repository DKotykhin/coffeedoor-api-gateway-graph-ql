import { Field, ObjectType } from '@nestjs/graphql';

import { OrderItem } from '../../order-item/entities/order-item.entity';
import { Order } from './order.entity';

@ObjectType()
export class OrderWithItems extends Order {
  @Field(() => [OrderItem], { nullable: true })
  orderItem: OrderItem[];
}
