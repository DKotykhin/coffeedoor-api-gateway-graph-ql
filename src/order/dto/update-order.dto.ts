import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { DeliveryWay, OrderStatus } from '../../common/types/enums';

@InputType()
export class UpdateOrderDto {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  userName: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field(() => DeliveryWay, { nullable: true })
  deliveryWay: DeliveryWay | string;

  @Field({ nullable: true })
  deliveryAddress: string;

  @Field(() => OrderStatus, { nullable: true })
  orderStatus: OrderStatus | string;

  @Field({ nullable: true })
  comment: string;

  @Field({ nullable: true })
  totalSum: number;

  @Field({ nullable: true })
  averageSum: number;

  @Field({ nullable: true })
  totalQuantity: number;
}
