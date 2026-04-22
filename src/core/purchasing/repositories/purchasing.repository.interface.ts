import { Invoice } from '../../invoice/entities/invoice.entity';
import { InvoiceDetail } from '../../invoice/entities/invoice-detail.entity';

export interface IPurchasingRepository {
  findAll(): Promise<Invoice[]>;
  findOne(id: string): Promise<Invoice | null>;
  findDetailsByInvoiceId(invoiceId: string): Promise<InvoiceDetail[]>;
  create(data: Partial<Invoice>): Promise<Invoice>;
  createDetail(data: Partial<InvoiceDetail>): Promise<InvoiceDetail>;
  update(id: string, data: Partial<Invoice>): Promise<void>;
  deleteDetailsByInvoiceId(invoiceId: string): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  detailExists(id: string): Promise<boolean>;
  sumAmountsByInvoiceIds(invoiceIds: string[]): Promise<Map<string, number>>;
}

export const PURCHASING_REPOSITORY = 'PURCHASING_REPOSITORY';
