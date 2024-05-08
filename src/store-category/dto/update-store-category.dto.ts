import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStoreCategoryDto {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  subtitle: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  position: number;
}
