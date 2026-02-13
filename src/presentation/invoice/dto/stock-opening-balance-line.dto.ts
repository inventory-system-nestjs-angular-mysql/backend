import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for a single line item in Stock Opening Balance
 * References stock detail (stock + unit); stockId is resolved from stock detail when saving.
 */
export class StockOpeningBalanceLineDto {
  @IsString()
  @IsNotEmpty()
  stockDetailId: string;

  @IsString()
  @IsOptional()
  stockCode?: string | null;

  @IsString()
  @IsOptional()
  stockName?: string | null;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  qty: number;

  @IsString()
  @IsOptional()
  unit?: string | null;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  purchasePrice: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;
}
