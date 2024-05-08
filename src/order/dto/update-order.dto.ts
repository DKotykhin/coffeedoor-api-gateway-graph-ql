import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  deliveryWay?: string;

  @Field({ nullable: true })
  deliveryAddress?: string;

  @Field({ nullable: true })
  orderStatus?: string;

  @Field({ nullable: true })
  comment?: string;

  @Field({ nullable: true })
  totalSum?: number;

  @Field({ nullable: true })
  averageSum?: number;

  @Field({ nullable: true })
  totalQuantity?: number;
}
