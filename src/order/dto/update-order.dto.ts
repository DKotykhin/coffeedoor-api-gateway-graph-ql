import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsMobilePhone,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

import { DeliveryWay, OrderStatus } from '../../common/types/enums';

@InputType()
export class UpdateOrderDto {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  userName: string;

  @Field({ nullable: true })
  @IsString()
  userId: string;

  @Field({ nullable: true })
  @IsString()
  @Length(10, 13, { message: 'Phone must be between 10 and 13 characters' })
  @IsMobilePhone('uk-UA')
  phoneNumber: string;

  @Field(() => DeliveryWay, { nullable: true })
  @IsEnum(DeliveryWay)
  deliveryWay: DeliveryWay | string;

  @Field({ nullable: true })
  @IsString()
  @Length(2, 200, { message: 'Address must be between 2 and 200 characters' })
  deliveryAddress: string;

  @Field(() => OrderStatus, { nullable: true })
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus | string;

  @Field({ nullable: true })
  @IsString()
  @Length(2, 500, { message: 'Address must be between 2 and 500 characters' })
  comment: string;

  @Field({ nullable: true })
  @IsNumber()
  totalSum: number;

  @Field({ nullable: true })
  @IsNumber()
  averageSum: number;

  @Field({ nullable: true })
  @IsNumber()
  totalQuantity: number;
}
