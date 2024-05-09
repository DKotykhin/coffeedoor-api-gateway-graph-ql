import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DeliveryWay, OrderStatus } from '../../common/types/enums';

@InputType()
export class UpdateOrderDto {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  userName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Field(() => DeliveryWay, { nullable: true })
  @IsOptional()
  @IsEnum(DeliveryWay)
  deliveryWay?: DeliveryWay | string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @Field(() => OrderStatus, { nullable: true })
  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus?: OrderStatus | string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  comment?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  totalSum?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  averageSum?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  totalQuantity?: number;
}
