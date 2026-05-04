export interface PayheaderData {
  id: string;
  refNo: string | null;
  currencyId: string | null;
  date: Date | null;
  remark: string | null;
  supplierId: string | null;
  supplierCode: string | null;
  cash: number;
  bankTransfer: number;
  creditCard: number;
  debitCard: number;
  voucher: number;
  cheque: number;
  fromBank: string | null;
  chequeNo: string | null;
  chequeDate: Date | null;
  code: string | null;
  tipe: string | null;
  cair: number;
  warehouseId: string | null;
}

export interface PaydetailData {
  id: string;
  type: string | null;
  invoiceId: string | null;
  amount: number;
  headerId: string | null;
  order: number;
  date: Date | null;
  tgl: Date | null;
  dueDate: Date | null;
  nilai: number;
  sisa: number;
  check: number;
  refNo: string | null;
}

export interface OutstandingInvoiceItem {
  id: string;
  invoiceNo: string;
  date: string | null;
  dueDate: string | null;
  amount: number;
  balance: number;
  special: string;
}

export interface SupplierLookupItem {
  id: string;
  code: string;
  name: string;
}

export interface InvoiceLookupResult {
  supplierId: string | null;
  warehouseId: string | null;
  currencyId: string | null;
}

export interface ISupplierPaymentRepository {
  findAll(): Promise<PayheaderData[]>;
  findOne(id: string): Promise<PayheaderData | null>;
  findDetailsByHeaderId(headerId: string): Promise<PaydetailData[]>;
  createHeader(data: Partial<PayheaderData>): Promise<void>;
  createDetail(data: Partial<PaydetailData>): Promise<void>;
  updateHeader(id: string, data: Partial<PayheaderData>): Promise<void>;
  deleteDetailsByHeaderId(headerId: string): Promise<void>;
  deleteHeader(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  detailExists(id: string): Promise<boolean>;
  refNoExists(refNo: string): Promise<boolean>;
  getNextInvoiceNo(): Promise<string>;
  updateLastInvoiceNo(no: string): Promise<void>;
  findOutstandingInvoices(supplierId: string, currencyId: string): Promise<OutstandingInvoiceItem[]>;
  searchByInvoiceNo(invoiceNo: string): Promise<InvoiceLookupResult | null>;
  searchSupplierByName(name: string): Promise<SupplierLookupItem[]>;
}

export const SUPPLIER_PAYMENT_REPOSITORY = 'SUPPLIER_PAYMENT_REPOSITORY';
