import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  MaxLength,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class CreateStockGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  serialNumber?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  markupAmount1?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  markupPercentage1?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  markupAmount2?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  markupPercentage2?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  groupValue?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  groupValueDollar?: number | null;

  @IsString()
  @IsOptional()
  @Length(0, 4)
  groupCode?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  quantity?: number;
}

