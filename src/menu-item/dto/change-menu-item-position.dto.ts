import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ChangeMenuItemPositionDto {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  oldPosition: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  newPosition: number;
}
