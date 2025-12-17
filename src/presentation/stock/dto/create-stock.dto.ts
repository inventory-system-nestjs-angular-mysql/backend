import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  MaxLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStockDetailDto } from './create-stock-detail.dto';

/**
 * Presentation Layer DTO - HTTP Request DTO for creating Stock
 */
export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  stockName: string;

  @IsString()
  @IsOptional()
  @MaxLength(23)
  stockGroupId?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minStock?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxStock?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  purchasePrice?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  purchasePriceDollar?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  extraFee?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  extraFeeDollar?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cogs?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cogsDollar?: number;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  supplier?: string | null;

  @IsString()
  @IsNotEmpty()
  taxOption: 'Tax' | 'Tax Free' | 'Non Tax';

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isService?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  brand?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  size?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  color?: string | null;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isSuspended?: boolean;

  @IsString()
  @IsOptional()
  memo?: string | null;

  @IsDateString()
  @IsOptional()
  lastDate?: Date | null;

  @IsString()
  @IsOptional()
  @MaxLength(45)
  imagePath?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  rack1?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  rack2?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  rack3?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  rack4?: string | null;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  copyMemoToSalesInvoice?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  copyMemoToPurchasing?: boolean;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  wholesaleMarkup?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  retailMarkup?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price3Markup?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price4Markup?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price5Markup?: number;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  partNo1?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  partNo2?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  weight?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  dimLength?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  dimWidth?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  dimHeight?: number;

  @IsString()
  @IsOptional()
  @MaxLength(5)
  storeType?: string | null;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isConsignment?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  selectPriceTags?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  openPrice?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  roundUp?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  priceByQty?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  blockIfBelowPurchase?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  warnIfBelowCogs?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  blockIfInsufficientStock?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(6)
  kodeCoretax?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  permitLicense?: string | null;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  smallBusinessItem?: boolean;

  // Stock Details (master-detail relationship)
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateStockDetailDto)
  stockDetails?: CreateStockDetailDto[];
}

