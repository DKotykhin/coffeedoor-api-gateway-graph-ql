import { IsBoolean, IsString, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'User Name',
    type: String,
    example: 'kotykhin_d',
    minLength: 2,
    maxLength: 30,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  userName?: string;

  @ApiProperty({
    description: 'User address',
    type: String,
    example: 'Kyiv, Ukraine',
    minLength: 2,
    maxLength: 200,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 200, { message: 'Address must be between 2 and 200 characters' })
  address?: string;

  @ApiProperty({
    description: 'User Phone Number',
    type: String,
    example: '+380123456789',
    minLength: 7,
    maxLength: 12,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(7, 12, { message: 'Phone must be between 7 and 12 characters' })
  phoneNumber?: string;

  @ApiProperty({
    description: 'User Avatar',
    type: String,
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: 'User is Verified',
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({
    description: 'User Password Hash',
    type: String,
    example: 'Password123Hash',
    required: false,
  })
  @IsOptional()
  @IsString()
  passwordHash?: string;
}
