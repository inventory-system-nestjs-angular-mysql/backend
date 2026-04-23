export class PurchaseReturnLineResponseDto {
  id: string;
  stockId: string | null;
  stockCode: string | null;
  stockName: string | null;
  unit: string | null;
  qty: number;
  price: number;
  disc1: number;
  disc2: number;
  disc3: number;
  disc: number;
  amount: number | null;
  onHand: number;
  order: number;
  taxable: boolean;
}

export class PurchaseReturnResponseDto {
  id: string;
  invoiceNo: string | null;
  date: Date | null;
  dueDate: Date | null;
  supplierId: string | null;
  supplierName: string | null;
  warehouseId: string | null;
  warehouseName: string | null;
  currencyId: string | null;
  currencyName: string | null;
  isCash: boolean;
  discount1: number;
  discount2: number;
  discount3: number;
  discount: number;
  freight: number;
  freightPct: number;
  tax: number;
  po: string | null;
  taxInvoice: string | null;
  remark: string | null;
  sj: string | null;
  tglSj: Date | null;
  isPaid: boolean;
  scan1: string | null;
  scan2: string | null;
  scan3: string | null;
  scan4: string | null;
  totalAmount: number;
  returnTo: string | null;
  invoiceReturnTo: string | null;
  lines?: PurchaseReturnLineResponseDto[];
}

export class OutstandingInvoiceResponseDto {
  id: string;
  invoiceNo: string;
  date: Date;
  invoiceAmount: number;
  paidAmount: number;
  balance: number;
}
