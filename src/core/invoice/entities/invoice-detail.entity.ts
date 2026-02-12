/**
 * Domain Entity - Pure business entity without infrastructure concerns
 */
export class InvoiceDetail {
  id: string; // cIVDpk
  invoiceId: string; // cIVDfkINV
  stockId: string | null; // cIVDfkSTK
  qtyIn: number; // nIVDqtyin
  qtyOut: number; // nIVDqtyout
  zQtyIn: number; // nIVDzqtyin
  zQtyOut: number; // nIVDzqtyout
  price: number; // nIVDprice
  disc1: number; // nIVDdisc1
  disc2: number; // nIVDdisc2
  disc3: number; // nIVDdisc3
  disc: number; // nIVDdisc
  accQty: number; // nIVDaccqty
  accEnt: number; // nIVDaccent
  order: number; // nIVDorder
  code: string | null; // cIVDcode
  factor: number; // nIvdFactor
  ivdSplit: number; // nivdsplit
  unit: string | null; // cIVDunit
  amount: number | null; // nIVDAmount
  accQtyTransfer: number; // nIVDAccQtyTransfer
  onHand: number; // nIVDonHand
  adjust: number; // nIVDadjust
  porderId: string | null; // cIVDfkporder
  cost: number; // nCost
  pokok: number; // nIVDpokok
  stkppn: number; // nIVDstkppn
  serialNumber: string | null; // serino
  xkirim: number | null; // xkirim
  sn: string | null; // cIVDsn
  memo: string | null; // cIVDmemo
  kirim: number; // nIVDkirim
  id1: string | null; // civdid1
  id2: string | null; // civdid2
  id3: string | null; // civdid3
  batch: string | null; // civdbatch
  expire: Date | null; // divdexpire
  ven: number; // nIVDven
  venp: number; // nIVDvenp
  ven1: number; // nIVDven1
  venp1: number; // nIVDvenp1
  promoCard: string | null; // cIVDpromocard
  inipromo: number; // nIVDinipromo
  resep: string | null; // cIVDresep
  persen: number; // nivdpersen
  tgl: Date | null; // divdtgl
  nota: string | null; // civdnota
  po: number; // nivdpo
  stockId1: string | null; // civdfkstk1
  qtyResep: number; // qtyresep
  edit: number; // nivdedit
  disct: string | null; // disct
  pilih1: number; // nivdpilih1
  pilih2: number; // nivdpilih2
  discx: number; // nivddiscx
}

