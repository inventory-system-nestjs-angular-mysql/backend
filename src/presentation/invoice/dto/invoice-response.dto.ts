/**
 * Presentation Layer DTO - HTTP Response DTO for Invoice
 * Simplified DTO for customer/supplier invoice list
 */
export class InvoiceResponseDto {
  id: string; // Invoice ID
  invoice: string; // refNo
  date: Date | string;
  warehouse: string;
  currency: string;
  amount: number;
  remark?: string | null;
  rem?: number | null; // Remaining amount (piutang - paid)
}

