import { Field, InputType, Int } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateOrderItemDto {
  @Field()
  @IsUUID()
  id: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field(() => Int, { nullable: true })
  quantity: number;

  @Field(() => Int, { nullable: true })
  weight: number;
}
