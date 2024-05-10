import { Field, Int, ObjectType } from '@nestjs/graphql';

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

  @Field(() => Int, { defaultValue: 0 })
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  quantity: number;

  @Field(() => Int, { nullable: true })
  weight: number;
}
