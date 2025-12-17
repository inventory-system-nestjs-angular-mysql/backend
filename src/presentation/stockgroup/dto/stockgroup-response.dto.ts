/**
 * Presentation Layer DTO - HTTP Response DTO
 */
export class StockGroupResponseDto {
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

