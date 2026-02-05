import { InvoiceDetail } from '../entities/invoice-detail.entity';

/**
 * Repository Interface - Domain abstraction for invoice detail (line items) access
 */
export interface IInvoiceDetailRepository {
  create(detail: Partial<InvoiceDetail>): Promise<InvoiceDetail>;
  findByInvoiceId(invoiceId: string): Promise<InvoiceDetail[]>;
  deleteByInvoiceId(invoiceId: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
