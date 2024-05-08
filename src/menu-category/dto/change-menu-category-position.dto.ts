import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeMenuCategoryPositionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  oldPosition: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  newPosition: number;
}
