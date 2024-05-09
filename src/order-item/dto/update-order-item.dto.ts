import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdateOrderItemDto {
  @Field()
  @IsUUID()
  id: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  price: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  quantity: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  weight: number;
}
