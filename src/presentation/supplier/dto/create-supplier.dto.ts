import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  MaxLength
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Presentation Layer DTO - HTTP Request DTO for creating Supplier
 */
export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(23)
  cityId?: string | null;

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

  @IsString()
  @IsOptional()
  @MaxLength(40)
  address4?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  address5?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(16)
  npwp?: string | null; // TIN

  @IsString()
  @IsOptional()
  @MaxLength(16)
  nppkp?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  creditLimit?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discount?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  term?: number; // Due date in days

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  billToSame?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  billToName?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  billToAddress1?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  billToAddress2?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  billToAddress3?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  billToAddress4?: string | null;

  @IsDateString()
  @IsOptional()
  createDate?: string | null;

  @IsDateString()
  @IsOptional()
  lastDate?: string | null;

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

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  visitFrequency?: number | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  email?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  email2?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  email3?: string | null;
}

