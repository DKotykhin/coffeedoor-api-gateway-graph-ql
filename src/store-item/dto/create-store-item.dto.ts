import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { LanguageCode } from '../../types/enums';

class StoreCategory {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
export class CreateStoreItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({
    enum: LanguageCode,
    enumName: 'LanguageCode',
  })
  @IsEnum(LanguageCode)
  language: LanguageCode;

  @ApiProperty()
  @IsNotEmpty()
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

  @ApiProperty()
  @IsNotEmpty()
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

  @IsOptional()
  @IsBoolean()
  toOrder: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @ApiProperty()
  @IsNumber()
  position: number;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreCategory)
  category: StoreCategory;
}
