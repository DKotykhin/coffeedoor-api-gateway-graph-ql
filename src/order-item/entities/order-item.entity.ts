import { Field, ObjectType } from '@nestjs/graphql';

import { Order } from '../../order/entities/order.entity';

@ObjectType()
export class OrderItem {
  @Field()
  id: string;

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

  @Field(() => Order, { nullable: true })
  order?: {
    id: string;
  };
}
