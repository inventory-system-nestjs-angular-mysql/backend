import { StockDetailResponseDto } from './stock-detail-response.dto';

/**
 * Presentation Layer DTO - HTTP Response DTO for Stock
 * Matches frontend StockResponseModel structure
 */
export class StockResponseDto {
  cSTKpk: string;
  stockName: string;
  stockGroupId?: string | null;
  minStock?: number;
  maxStock?: number;
  purchasePrice?: number;
  purchasePriceDollar?: number;
  extraFee?: number;
  extraFeeDollar?: number;
  cogs?: number;
  cogsDollar?: number;
  supplier?: string;
  taxOption: 'Tax' | 'Tax Free' | 'Non Tax';
  isService?: boolean;
  isConsignment?: boolean;
  isSuspended?: boolean;
  selectPriceTags?: boolean;
  brand?: string;
  partNo1?: string;
  partNo2?: string;
  imagePath?: string;
  memo?: string;
  copyMemoToSalesInvoice?: boolean;
  copyMemoToPurchasing?: boolean;
  wholesaleMarkup?: number;
  retailMarkup?: number;
  price3Markup?: number;
  price4Markup?: number;
  price5Markup?: number;
  color?: string;
  weight?: number;
  dimLength?: number;
  dimWidth?: number;
  dimHeight?: number;
  rack1?: string;
  rack2?: string;
  rack3?: string;
  rack4?: string;
  storeType?: string;
  openPrice?: boolean;
  roundUp?: boolean;
  priceByQty?: boolean;
  blockIfBelowPurchase?: boolean;
  warnIfBelowCogs?: boolean;
  blockIfInsufficientStock?: boolean;
  kodeCoretax?: string;
  permitLicense?: string;
  smallBusinessItem?: boolean;
  stockDetails?: StockDetailResponseDto[];
}

