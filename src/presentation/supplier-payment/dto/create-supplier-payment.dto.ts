import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
  Min,
} from 'class-validator';

export class SupplierPaymentLineDto {
  @IsString()
  invoiceId: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  remark?: string | null;

  @IsOptional()
  @IsString()
  dueDate?: string | null;

  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateSupplierPaymentDto {
  @IsString()
  @MaxLength(20)
  invoiceNo: string;

  @IsString()
  date: string;

  @IsString()
  supplierId: string;

  @IsString()
  supplierCode: string;

  @IsOptional()
  @IsString()
  currencyId?: string | null;

  @IsOptional()
  @IsString()
  warehouseId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  remark?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cash?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bankTransfer?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  creditCard?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  debitCard?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  voucher?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cheque?: number;

  @IsOptional()
  @IsString()
  fromBankId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  chequeNo?: string | null;

  @IsOptional()
  @IsString()
  chequeDate?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SupplierPaymentLineDto)
  lines: SupplierPaymentLineDto[];
}
