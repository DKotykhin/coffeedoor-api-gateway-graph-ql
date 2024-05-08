import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

import { PasswordDto } from './auth.dto';

@InputType()
export class NewPasswordDto {
  @Field(() => PasswordDto)
  password: PasswordDto['password'];

  @Field()
  @IsString()
  token: string;
}
