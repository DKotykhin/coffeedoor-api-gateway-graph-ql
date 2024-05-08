import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStoreItemDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  details: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortKey: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortValue: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tm: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  oldPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weight: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  toOrder: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  position: number;
}
