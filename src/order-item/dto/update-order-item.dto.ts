import { Field, InputType, Int } from '@nestjs/graphql';
import { IsPositive, IsUUID } from 'class-validator';

@InputType()
export class UpdateOrderItemDto {
  @Field()
  @IsUUID()
  id: string;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  price: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  quantity: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  weight: number;
}
