import { Field, InputType, Int } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class UpdateStoreItemDto {
  @Field()
  slug: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  details: string;

  @Field({ nullable: true })
  sortKey: string;

  @Field({ nullable: true })
  sortValue: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  tm: string;

  @Field({ nullable: true })
  @IsPositive()
  price: number;

  @Field({ nullable: true })
  @IsPositive()
  oldPrice: number;

  @Field({ nullable: true })
  discount: number;

  @Field({ nullable: true })
  @IsPositive()
  weight: number;

  @Field({ nullable: true })
  toOrder: boolean;

  @Field({ nullable: true })
  hidden: boolean;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  position: number;
}
