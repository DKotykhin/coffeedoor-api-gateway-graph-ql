import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class OrderId {
  @Field()
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

  @Field()
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int, { nullable: true })
  weight?: number;

  @Field(() => OrderId)
  order: OrderId;
}
