import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';

import { IdDto } from '../../common/_index';

@InputType()
export class CreateOrderItem {
  @Field()
  slug: string;

  @Field()
  categoryTitle: string;

  @Field()
  itemTitle: string;

  @Field(() => Int)
  @IsPositive()
  price: number;

  @Field(() => Int)
  @IsPositive()
  quantity: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  weight: number;

  @Field(() => IdDto)
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => IdDto)
  order: IdDto;
}
