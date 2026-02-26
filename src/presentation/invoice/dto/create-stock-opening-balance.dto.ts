import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StockOpeningBalanceLineDto } from './stock-opening-balance-line.dto';

/**
 * DTO for creating a Stock Opening Balance (invoice + stock line items)
 * Uses entityId = '..awal.................' and salesmanId = '..default..............'
 */
export class CreateStockOpeningBalanceDto {
  @IsString()
  @IsNotEmpty()
  refNo: string;

  @IsString()
  @IsNotEmpty()
  date: string; // ISO date string

  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsString()
  @IsOptional()
  remark?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockOpeningBalanceLineDto)
  @ArrayMinSize(1, { message: 'At least one stock line is required' })
  lines: StockOpeningBalanceLineDto[];
}
