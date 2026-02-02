/**
 * Domain Entity - Pure business entity without infrastructure concerns
 */
export class Invoice {
  id: string; // cINVpk
  refNo: string | null; // cINVrefno
  date: Date | null; // dINVdate
  entityId: string | null; // cINVfkENT - Customer/Supplier ID
  salesmanId: string | null; // cINVfkSAM
  warehouseId: string | null; // cINVfkWHS
  exchangeId: string | null; // cINVfkEXC
  isCash: boolean; // nINVcash - 1 = cash, 0 = credit
  dueDate: Date | null; // dINVdue
  serie: string | null; // cinvserie
  taxInvoice: string | null; // cinvtaxinv
  po: string | null; // cinvpo
  remark: string | null; // cinvremark
  discount1: number; // nINVdisc1
  discount2: number; // nINVdisc2
  discount3: number; // nINVdisc3
  discount: number; // nINVdisc
  tax: number; // nINVtax
  isPaid: boolean; // nINVpaid - 1 = Paid
  user: string | null; // cINVuser
  special: string | null; // cINVspecial - 'BL' = purchasing, 'JL' = sales
  transfer: string | null; // cINVTransfer
  taxDate: Date | null; // dINVtaxdate
  freight: number; // nINVfreight
  entityCode: string | null; // cInvFkEntCode
  opening: number; // nInvOpening
  remark1: string | null; // cinvremark1
  returnTo: string | null; // cInvReturnto
  option: number; // ninvoption
  cetak: number; // ninvcetak
  dp: number; // nINVdp
  voucher: number; // nINVvoucher
  tunai: number; // nINVtunai
  piutang: number; // nINVpiutang
  credit: number; // nINVCredit
  debit: number; // nINVdebit
  jam: number; // nINVjam
  noCard: string | null; // ninvno_card
  jenisCard: string | null; // ninvjenis_card
  ccardNama: string | null; // ninvccard_nama
  ccardOto: string | null; // ninvccard_oto
  ccardNilai: number; // nINVccard_nilai
  kembali: number; // nINVkembali
  serialNumber: string | null; // serino
  xkirim: number; // xkirim
  kunci: number; // kunci
  oleh: string | null; // oleh
  point: number; // ninvpoint
  pax: number; // nINVpax
  dine: string | null; // cINVdine
  value: number; // nINVvalue
  postransfer: number; // npostransfer
  hadiah: string | null; // cINVhadiah
  meja: string | null; // cinvmeja
  mobileId: string | null; // cINVfkMOB
  promoValue: number; // nINVpromov
  promoDiscount: number; // nINVpromod
  promoSales: number; // nINVpromos
  sedan: string | null; // cINVsedan
  km: number; // nINVkm
  sedanCode: string | null; // cINVsedancode
  pawal: number; // niNVpawal
  okirim: number | null; // okirim
  rate: number; // nINVrate
  ivdTime: Date | null; // nIVDtime
  cetak1: number; // ninvcetak1
  clientId: string | null; // cINVfkKLI
  posId: string | null; // cINVfkPOS
  camId: string | null; // cINVfkCAM
  promog: string | null; // cINVpromog
  waste: number; // nINVwaste
  gratis: number; // nINVgratis
  sj: string | null; // cinvsj
  tglSj: Date | null; // dinvtglsj
  pilih: number; // ninvpilih
  value1: number; // nINVvalue1
  ratep: number; // ninvratep
  epajak: string | null; // cinvepajak
  persen: number; // ninvpersen
  mobile: number; // ninvmobile
  fg: number; // ninvfg
  poAmount: number; // ninvpo
  expire: number; // ninvexpire
  app: number; // ninvapp
  zap: number; // ninvzap
  lain: string | null; // cinvlain
  scan1: string | null; // cinvscan1
  scan2: string | null; // cinvscan2
  scan3: string | null; // cinvscan3
  scan4: string | null; // cinvscan4
  inv12: number; // ninv12
  canvas: string | null; // ninvcanvas
  tambah: string | null; // cinvtambah
  fee: number; // ninvfee
  kode: string | null; // cinvkode
  cap: string | null; // cinvcap
  ket: string | null; // cinvket
  jasa: string | null; // cinvjasa
  tidak: number; // ninvtidak
  namapc: string | null; // cinvnamapc
}

