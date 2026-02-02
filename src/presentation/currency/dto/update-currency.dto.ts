import {
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Presentation Layer DTO - HTTP Request DTO for updating Currency
 */
export class UpdateCurrencyDto {
  @IsString()
  @IsOptional()
  @MaxLength(10)
  currency?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  rate?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  taxRate?: number;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  serialNumber?: string | null;
}

