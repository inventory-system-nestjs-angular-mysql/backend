export class GoodsTransferLineResponseDto {
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

export class GoodsTransferResponseDto {
  id: string;
  invoiceNo: string | null;
  date: Date | null;
  dueDate: Date | null;
  fromWarehouseId: string | null;
  fromWarehouseName: string | null;
  toWarehouseId: string | null;
  toWarehouseName: string | null;
  currencyId: string | null;
  currencyName: string | null;
  discount1: number;
  discount2: number;
  discount3: number;
  discount: number;
  freight: number;
  freightPct: number;
  tax: number;
  remark: string | null;
  sj: string | null;
  tglSj: Date | null;
  scan1: string | null;
  scan2: string | null;
  scan3: string | null;
  scan4: string | null;
  totalAmount: number;
  lines?: GoodsTransferLineResponseDto[];
}
