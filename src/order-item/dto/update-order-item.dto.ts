import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOrderItemDto {
  @Field()
  id: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Int, { nullable: true })
  weight?: number;
}
