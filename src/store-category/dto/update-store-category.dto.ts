import { IsUUID } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStoreCategoryDto {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  subtitle: string;

  @Field({ nullable: true })
  hidden?: boolean;

  @Field(() => Int, { nullable: true })
  position: number;
}
