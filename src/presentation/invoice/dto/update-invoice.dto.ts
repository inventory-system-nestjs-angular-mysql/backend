/**
 * Presentation Layer DTO - HTTP Request DTO for updating Invoice
 */
export class UpdateInvoiceDto {
  refNo?: string | null;
  date?: Date | string | null;
  entityId?: string | null;
  salesmanId?: string | null;
  warehouseId?: string | null;
  exchangeId?: string | null;
  isCash?: boolean;
  dueDate?: Date | string | null;
  special?: string | null;
  value?: number | null;
  remark?: string | null;
  // Add other fields as needed
}

