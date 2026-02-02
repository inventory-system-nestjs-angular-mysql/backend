import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  currency: string; // Currency code/description

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  rate: number; // Exchange rate

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  taxRate?: number; // Tax rate

  @IsString()
  @IsOptional()
  @MaxLength(10)
  serialNumber?: string | null;
}

