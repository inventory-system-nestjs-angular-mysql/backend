/**
 * Presentation Layer DTO - HTTP Response DTO for StockDetail
 * Matches frontend StockPriceRow structure
 */
export class StockDetailResponseDto {
  stockCode: string;
  unit: string;
  factor: number;
  purchase: number;
  wholesale: number;
  retail: number;
  priceDollar?: number;
  price3?: number;
  price4?: number;
  price5?: number;
  isKey: boolean;
}

