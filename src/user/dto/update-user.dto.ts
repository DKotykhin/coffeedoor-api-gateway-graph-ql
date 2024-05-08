import { IsBoolean, IsString, Length, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field()
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  userName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 200, { message: 'Address must be between 2 and 200 characters' })
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(7, 12, { message: 'Phone must be between 7 and 12 characters' })
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  passwordHash?: string;
}
