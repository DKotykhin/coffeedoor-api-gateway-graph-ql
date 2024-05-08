import { IsString, IsEmail, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordDto {
  @ApiProperty({
    description: 'User Password',
    type: String,
    example: 'Password123',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @Length(8, 100, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;
}
export class EmailDto {
  @ApiProperty({
    description: 'User Email',
    type: String,
    example: 'kotykhin_d@ukr.net',
  })
  @IsEmail()
  email: string;
}
export class SignInDto extends PasswordDto {
  @ApiProperty({
    description: 'User Email',
    type: String,
    example: 'kotykhin_d@ukr.net',
  })
  @IsEmail()
  email: string;
}

export class SignUpDto extends SignInDto {
  @ApiProperty({
    description: 'User name',
    type: String,
    example: 'kotykhin_d',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @Length(2, 30, { message: 'Name must be at least 2 characters' })
  userName: string;
}
