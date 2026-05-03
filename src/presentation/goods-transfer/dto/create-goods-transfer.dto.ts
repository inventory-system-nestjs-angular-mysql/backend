import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsArray,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GoodsTransferLineDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(23)
  stockId: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  stockCode?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  unit?: string | null;

  @IsNumber()
  @Type(() => Number)
  qty: number;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  disc1?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  disc2?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  disc3?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  disc?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  amount?: number | null;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  taxable?: boolean;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  onHand?: number;
}

export class CreateGoodsTransferDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  invoiceNo: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(23)
  fromWarehouseId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(23)
  toWarehouseId: string;

  @IsString()
  @IsOptional()
  @MaxLength(23)
  currencyId?: string | null;

  @IsDateString()
  @IsOptional()
  dueDate?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discount1?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discount2?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discount3?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discount?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  freight?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  freightPct?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  tax?: number;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  remark?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  sj?: string | null;

  @IsDateString()
  @IsOptional()
  tglSj?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  scan1?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  scan2?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  scan3?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  scan4?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoodsTransferLineDto)
  lines: GoodsTransferLineDto[];
}
