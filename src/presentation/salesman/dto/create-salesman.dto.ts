import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Presentation Layer DTO - HTTP Request DTO for creating Salesman
 */
export class CreateSalesmanDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  address1?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  address2?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  address3?: string | null;

  @IsDateString()
  @IsOptional()
  lastDate?: Date | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  commission?: number | null;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isSuspended?: boolean;

  @IsString()
  @IsOptional()
  memo?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(45)
  imagePath?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(2)
  special?: string | null;
}

