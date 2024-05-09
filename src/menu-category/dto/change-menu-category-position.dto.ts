import { IsUUID } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ChangeMenuCategoryPositionDto {
  @Field()
  @IsUUID()
  id: string;

  @Field(() => Int)
  oldPosition: number;

  @Field(() => Int)
  newPosition: number;
}
