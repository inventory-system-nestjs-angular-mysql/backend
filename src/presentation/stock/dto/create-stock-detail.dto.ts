import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Presentation Layer DTO - HTTP Request DTO for creating StockDetail
 * Maps from frontend StockPriceRow structure
 */
export class CreateStockDetailDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  stockCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  unit: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  factor?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  purchase?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  wholesale?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  retail?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  priceDollar?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price3?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price4?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price5?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isKey?: boolean;
}

