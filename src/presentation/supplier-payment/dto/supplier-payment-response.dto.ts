export class SupplierPaymentLineResponseDto {
  invoiceId: string | null;
  invoiceNo: string | null;
  amount: number;
  remark: string | null;
  dueDate: string | null;
  order: number;
}

export class SupplierPaymentResponseDto {
  id: string;
  invoiceNo: string | null;
  date: string | null;
  supplierId: string | null;
  supplierCode: string | null;
  supplierName: string | null;
  currencyId: string | null;
  currencyName: string | null;
  warehouseId: string | null;
  warehouseName: string | null;
  remark: string | null;
  cash: number;
  bankTransfer: number;
  creditCard: number;
  debitCard: number;
  voucher: number;
  cheque: number;
  fromBankId: string | null;
  fromBankName: string | null;
  chequeNo: string | null;
  chequeDate: string | null;
  totalPaid: number;
  lines?: SupplierPaymentLineResponseDto[];
}

export class OutstandingInvoiceResponseDto {
  id: string;
  invoiceNo: string;
  date: string | null;
  dueDate: string | null;
  amount: number;
  balance: number;
  special: string;
}

export class SupplierLookupResponseDto {
  id: string;
  code: string;
  name: string;
}

export class InvoiceLookupResponseDto {
  supplierId: string | null;
  warehouseId: string | null;
  currencyId: string | null;
}
