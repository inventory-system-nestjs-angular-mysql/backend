import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Presentation Layer DTO - HTTP Request DTO for creating Invoice
 */
export class CreateInvoiceDto {
  @IsString()
  @IsOptional()
  id?: string; // Optional ID - if provided, will update existing invoice

  @IsString()
  @IsNotEmpty()
  refNo: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date | string;

  @IsString()
  @IsOptional()
  entityId?: string | null;

  @IsString()
  @IsOptional()
  salesmanId?: string | null;

  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsString()
  @IsNotEmpty()
  exchangeId: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isCash?: boolean;

  @IsDateString()
  @IsOptional()
  dueDate?: Date | string | null;

  @IsString()
  @IsOptional()
  special?: string | null; // 'BL' = purchasing, 'JL' = sales

  @IsString()
  @IsOptional()
  remark?: string | null;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  value: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  opening?: number | null; // For opening balance
}

