/**
 * DTO for stock detail lookup (e.g. opening balance line selection)
 * Includes stock detail id, stock info, code and unit for display and save
 */
export class StockDetailLookupItemDto {
  id: string;
  stockId: string;
  stockName: string;
  stockCode: string;
  unit: string; // unit id (e.g. for invoice detail)
  unitDescription?: string;
  purchase: number;
}
