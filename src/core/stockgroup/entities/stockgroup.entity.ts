/**
 * Domain Entity - Pure business entity without infrastructure concerns
 */
export class StockGroup {
  id: string;
  description: string;
  serialNumber: string | null;
  markupAmount1: number | null;
  markupPercentage1: number | null;
  markupAmount2: number | null;
  markupPercentage2: number | null;
  groupValue: number | null;
  groupValueDollar: number | null;
  groupCode: string | null;
  quantity: number;
}

