/**
 * Response DTO for a single stock opening balance line
 */
export class OpeningBalanceLineResponseDto {
  stockDetailId: string; // id1 — original stock detail reference
  stockCode: string;     // code stored in invoice detail
  unit: string;          // unit ID
  qty: number;           // qtyIn
  purchasePrice: number; // pokok (purchase price at time of entry)
  amount: number;        // line amount
}

/**
 * Response DTO for a stock opening balance invoice with its detail lines
 */
export class OpeningBalanceDetailDto {
  id: string;
  refNo: string;
  date: Date | string;
  warehouseId: string;
  currencyId: string;
  remark?: string | null;
  amount: number;
  lines: OpeningBalanceLineResponseDto[];
}
