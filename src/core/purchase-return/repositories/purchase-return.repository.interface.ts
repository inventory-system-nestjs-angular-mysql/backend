import { IPurchasingRepository } from '../../purchasing/repositories/purchasing.repository.interface';

export interface OutstandingInvoiceItem {
  id: string;
  invoiceNo: string;
  date: Date;
  invoiceAmount: number;
  paidAmount: number;
  balance: number;
}

export interface IPurchaseReturnRepository extends IPurchasingRepository {
  findOutstandingInvoices(supplierId: string, currencyId: string): Promise<OutstandingInvoiceItem[]>;
  createPayheader(data: Record<string, unknown>): Promise<string>;
  createPaydetail(data: Record<string, unknown>): Promise<void>;
  deletePaymentByReturnId(returnInvoiceId: string): Promise<void>;
  payheaderExists(id: string): Promise<boolean>;
  paydetailExists(id: string): Promise<boolean>;
}

export const PURCHASE_RETURN_REPOSITORY = 'PURCHASE_RETURN_REPOSITORY';
