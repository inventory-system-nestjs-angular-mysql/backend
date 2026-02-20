import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { Invoice } from '../../../../core/invoice/entities/invoice.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('invoice')
@Index('cINVfkENT', ['cINVfkENT'])
@Index('cINVfkSAM', ['cINVfkSAM'])
@Index('cINVfkWHS', ['cINVfkWHS'])
@Index('cINVfkEXC', ['cINVfkEXC'])
@Index('dINVdate', ['dINVdate'])
@Index('nINVcash', ['nINVcash'])
@Index('dINVdue', ['dINVdue'])
@Index('cINVspecial', ['cINVspecial'])
@Index('nINVpaid', ['nINVpaid'])
@Index('cINVTransfer', ['cINVTransfer'])
@Index('cInvFkEntCode', ['cInvFkEntCode'])
@Index('cINVrefno', ['cINVrefno'])
@Index('serino', ['serino'])
export class InvoiceTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cINVpk' })
  cINVpk: string;

  @Column({ type: 'varchar', length: 20, name: 'cINVrefno', nullable: true })
  cINVrefno: string | null;

  @Column({ type: 'date', name: 'dINVdate', nullable: true })
  dINVdate: Date | null;

  @Column({ type: 'char', length: 23, name: 'cINVfkENT', nullable: true })
  cINVfkENT: string | null;

  @Column({ type: 'char', length: 23, name: 'cINVfkSAM', default: '..default..............' })
  cINVfkSAM: string | null;

  @Column({ type: 'char', length: 23, name: 'cINVfkWHS', nullable: true })
  cINVfkWHS: string | null;

  @Column({ type: 'char', length: 23, name: 'cINVfkEXC', default: '..rupiah...............' })
  cINVfkEXC: string | null;

  @Column({ type: 'int', unsigned: true, name: 'nINVcash', default: 0, comment: 'cash = 1 (cash), 0 (credit)' })
  nINVcash: number;

  @Column({ type: 'date', name: 'dINVdue', nullable: true, comment: 'due date' })
  dINVdue: Date | null;

  @Column({ type: 'varchar', length: 40, name: 'cinvserie', default: ' ' })
  cinvserie: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cinvtaxinv', default: ' ' })
  cinvtaxinv: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cinvpo', default: ' ' })
  cinvpo: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cinvremark', default: ' ' })
  cinvremark: string | null;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nINVdisc1', default: 0.0 })
  nINVdisc1: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nINVdisc2', default: 0.0 })
  nINVdisc2: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nINVdisc3', default: 0.0 })
  nINVdisc3: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVdisc', default: 0.0 })
  nINVdisc: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nINVtax', default: 0.0 })
  nINVtax: number;

  @Column({ type: 'int', unsigned: true, name: 'nINVpaid', default: 0, comment: "1 = Paid, so don't have to count for A/R acc" })
  nINVpaid: number;

  @Column({ type: 'varchar', length: 10, name: 'cINVuser', nullable: true })
  cINVuser: string | null;

  @Column({ type: 'varchar', length: 2, name: 'cINVspecial', nullable: true })
  cINVspecial: string | null;

  @Column({ type: 'char', length: 23, name: 'cINVTransfer', default: 'n/a' })
  cINVTransfer: string | null;

  @Column({ type: 'date', name: 'dINVtaxdate', nullable: true })
  dINVtaxdate: Date | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVfreight', default: 0.0 })
  nINVfreight: number;

  @Column({ type: 'char', length: 20, name: 'cInvFkEntCode', nullable: true })
  cInvFkEntCode: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nInvOpening', default: 0.0 })
  nInvOpening: number;

  @Column({ type: 'varchar', length: 45, name: 'cinvremark1', default: ' ' })
  cinvremark1: string | null;

  @Column({ type: 'char', length: 23, name: 'cInvReturnto', default: '' })
  cInvReturnto: string | null;

  @Column({ type: 'int', name: 'ninvoption', default: 0 })
  ninvoption: number;

  @Column({ type: 'decimal', precision: 1, scale: 0, name: 'ninvcetak', default: 0, comment: 'apakah sudah pernah cetak' })
  ninvcetak: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVdp', default: 0.0 })
  nINVdp: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVvoucher', default: 0.0 })
  nINVvoucher: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVtunai', default: 0.0 })
  nINVtunai: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVpiutang', default: 0.0 })
  nINVpiutang: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVCredit', default: 0.0 })
  nINVCredit: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVdebit', default: 0.0 })
  nINVdebit: number;

  @Column({ type: 'int', name: 'nINVjam', default: 0 })
  nINVjam: number;

  @Column({ type: 'varchar', length: 20, name: 'ninvno_card', default: ' ' })
  ninvno_card: string | null;

  @Column({ type: 'varchar', length: 20, name: 'ninvjenis_card', default: ' ' })
  ninvjenis_card: string | null;

  @Column({ type: 'varchar', length: 30, name: 'ninvccard_nama', default: ' ' })
  ninvccard_nama: string | null;

  @Column({ type: 'varchar', length: 20, name: 'ninvccard_oto', default: ' ' })
  ninvccard_oto: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVccard_nilai', default: 0.0 })
  nINVccard_nilai: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVkembali', default: 0.0 })
  nINVkembali: number;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  @Column({ type: 'int', name: 'xkirim', default: 0 })
  xkirim: number;

  @Column({ type: 'int', name: 'kunci', default: 0 })
  kunci: number;

  @Column({ type: 'text', name: 'oleh', nullable: true })
  oleh: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 0, name: 'ninvpoint', default: 0 })
  ninvpoint: number;

  @Column({ type: 'int', name: 'nINVpax', default: 0 })
  nINVpax: number;

  @Column({ type: 'varchar', length: 10, name: 'cINVdine', default: ' ' })
  cINVdine: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVvalue', default: 0.0 })
  nINVvalue: number;

  @Column({ type: 'int', name: 'npostransfer', default: 0 })
  npostransfer: number;

  @Column({ type: 'text', name: 'cINVhadiah', nullable: true })
  cINVhadiah: string | null;

  @Column({ type: 'varchar', length: 6, name: 'cinvmeja', default: ' ' })
  cinvmeja: string | null;

  @Column({ type: 'varchar', length: 23, name: 'cINVfkMOB', default: ' ' })
  cINVfkMOB: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVpromov', default: 0.0 })
  nINVpromov: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVpromod', default: 0.0 })
  nINVpromod: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVpromos', default: 0.0 })
  nINVpromos: number;

  @Column({ type: 'varchar', length: 23, name: 'cINVsedan', default: ' ' })
  cINVsedan: string | null;

  @Column({ type: 'int', name: 'nINVkm', default: 0 })
  nINVkm: number;

  @Column({ type: 'varchar', length: 20, name: 'cINVsedancode', default: ' ' })
  cINVsedancode: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 0, name: 'niNVpawal', default: 0 })
  niNVpawal: number;

  @Column({ type: 'int', name: 'okirim', nullable: true })
  okirim: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVrate', default: 1.0 })
  nINVrate: number;

  @Column({ type: 'datetime', name: 'nIVDtime', nullable: true })
  nIVDtime: Date | null;

  @Column({ type: 'int', name: 'ninvcetak1', default: 0 })
  ninvcetak1: number;

  @Column({ type: 'varchar', length: 23, name: 'cINVfkKLI', default: ' ' })
  cINVfkKLI: string | null;

  @Column({ type: 'varchar', length: 23, name: 'cINVfkPOS', default: ' ' })
  cINVfkPOS: string | null;

  @Column({ type: 'varchar', length: 23, name: 'cINVfkCAM', default: ' ' })
  cINVfkCAM: string | null;

  @Column({ type: 'varchar', length: 79, name: 'cINVpromog', default: ' ' })
  cINVpromog: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVwaste', default: 0.0 })
  nINVwaste: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVgratis', default: 0.0 })
  nINVgratis: number;

  @Column({ type: 'varchar', length: 20, name: 'cinvsj', default: '' })
  cinvsj: string | null;

  @Column({ type: 'date', name: 'dinvtglsj', nullable: true })
  dinvtglsj: Date | null;

  @Column({ type: 'int', name: 'ninvpilih', default: 0 })
  ninvpilih: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nINVvalue1', default: 0.0 })
  nINVvalue1: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'ninvratep', default: 1.0 })
  ninvratep: number;

  @Column({ type: 'text', name: 'cinvepajak', nullable: true })
  cinvepajak: string | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'ninvpersen', default: 0.0 })
  ninvpersen: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'ninvmobile', default: 0.0 })
  ninvmobile: number;

  @Column({ type: 'int', name: 'ninvfg', default: 0 })
  ninvfg: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'ninvpo', default: 0.0 })
  ninvpo: number;

  @Column({ type: 'int', name: 'ninvexpire', default: 0 })
  ninvexpire: number;

  @Column({ type: 'int', name: 'ninvapp', default: 0 })
  ninvapp: number;

  @Column({ type: 'int', name: 'ninvzap', default: 0 })
  ninvzap: number;

  @Column({ type: 'varchar', length: 23, name: 'cinvlain', default: '' })
  cinvlain: string | null;

  @Column({ type: 'varchar', length: 50, name: 'cinvscan1', default: '' })
  cinvscan1: string | null;

  @Column({ type: 'varchar', length: 50, name: 'cinvscan2', default: '' })
  cinvscan2: string | null;

  @Column({ type: 'varchar', length: 50, name: 'cinvscan3', default: '' })
  cinvscan3: string | null;

  @Column({ type: 'varchar', length: 50, name: 'cinvscan4', default: '' })
  cinvscan4: string | null;

  @Column({ type: 'int', name: 'ninv12', default: 1 })
  ninv12: number;

  @Column({ type: 'varchar', length: 2, name: 'ninvcanvas', default: '01' })
  ninvcanvas: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cinvtambah', default: '' })
  cinvtambah: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'ninvfee', default: 0.0 })
  ninvfee: number;

  @Column({ type: 'varchar', length: 2, name: 'cinvkode', default: '04' })
  cinvkode: string | null;

  @Column({ type: 'varchar', length: 8, name: 'cinvcap', default: '' })
  cinvcap: string | null;

  @Column({ type: 'varchar', length: 8, name: 'cinvket', default: '' })
  cinvket: string | null;

  @Column({ type: 'varchar', length: 1, name: 'cinvjasa', default: 'A' })
  cinvjasa: string | null;

  @Column({ type: 'int', name: 'ninvtidak', default: 0 })
  ninvtidak: number;

  @Column({ type: 'varchar', length: 10, name: 'cinvnamapc', default: '' })
  cinvnamapc: string | null;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): Invoice {
    const domain = new Invoice();
    domain.id = this.cINVpk;
    domain.refNo = this.cINVrefno;
    domain.date = this.dINVdate;
    domain.entityId = this.cINVfkENT;
    domain.salesmanId = this.cINVfkSAM;
    domain.warehouseId = this.cINVfkWHS;
    domain.exchangeId = this.cINVfkEXC;
    domain.isCash = this.nINVcash === 1;
    domain.dueDate = this.dINVdue;
    domain.serie = this.cinvserie;
    domain.taxInvoice = this.cinvtaxinv;
    domain.po = this.cinvpo;
    domain.remark = this.cinvremark;
    domain.discount1 = Number(this.nINVdisc1);
    domain.discount2 = Number(this.nINVdisc2);
    domain.discount3 = Number(this.nINVdisc3);
    domain.discount = Number(this.nINVdisc);
    domain.tax = Number(this.nINVtax);
    domain.isPaid = this.nINVpaid === 1;
    domain.user = this.cINVuser;
    domain.special = this.cINVspecial;
    domain.transfer = this.cINVTransfer;
    domain.taxDate = this.dINVtaxdate;
    domain.freight = Number(this.nINVfreight);
    domain.entityCode = this.cInvFkEntCode;
    domain.opening = Number(this.nInvOpening);
    domain.remark1 = this.cinvremark1;
    domain.returnTo = this.cInvReturnto;
    domain.option = this.ninvoption;
    domain.cetak = Number(this.ninvcetak);
    domain.dp = Number(this.nINVdp);
    domain.voucher = Number(this.nINVvoucher);
    domain.tunai = Number(this.nINVtunai);
    domain.piutang = Number(this.nINVpiutang);
    domain.credit = Number(this.nINVCredit);
    domain.debit = Number(this.nINVdebit);
    domain.jam = this.nINVjam;
    domain.noCard = this.ninvno_card;
    domain.jenisCard = this.ninvjenis_card;
    domain.ccardNama = this.ninvccard_nama;
    domain.ccardOto = this.ninvccard_oto;
    domain.ccardNilai = Number(this.nINVccard_nilai);
    domain.kembali = Number(this.nINVkembali);
    domain.serialNumber = this.serino;
    domain.xkirim = this.xkirim;
    domain.kunci = this.kunci;
    domain.oleh = this.oleh;
    domain.point = Number(this.ninvpoint);
    domain.pax = this.nINVpax;
    domain.dine = this.cINVdine;
    domain.value = Number(this.nINVvalue);
    domain.postransfer = this.npostransfer;
    domain.hadiah = this.cINVhadiah;
    domain.meja = this.cinvmeja;
    domain.mobileId = this.cINVfkMOB;
    domain.promoValue = Number(this.nINVpromov);
    domain.promoDiscount = Number(this.nINVpromod);
    domain.promoSales = Number(this.nINVpromos);
    domain.sedan = this.cINVsedan;
    domain.km = this.nINVkm;
    domain.sedanCode = this.cINVsedancode;
    domain.pawal = Number(this.niNVpawal);
    domain.okirim = this.okirim;
    domain.rate = Number(this.nINVrate);
    domain.ivdTime = this.nIVDtime;
    domain.cetak1 = this.ninvcetak1;
    domain.clientId = this.cINVfkKLI;
    domain.posId = this.cINVfkPOS;
    domain.camId = this.cINVfkCAM;
    domain.promog = this.cINVpromog;
    domain.waste = Number(this.nINVwaste);
    domain.gratis = Number(this.nINVgratis);
    domain.sj = this.cinvsj;
    domain.tglSj = this.dinvtglsj;
    domain.pilih = this.ninvpilih;
    domain.value1 = Number(this.nINVvalue1);
    domain.ratep = Number(this.ninvratep);
    domain.epajak = this.cinvepajak;
    domain.persen = Number(this.ninvpersen);
    domain.mobile = Number(this.ninvmobile);
    domain.fg = this.ninvfg;
    domain.poAmount = Number(this.ninvpo);
    domain.expire = this.ninvexpire;
    domain.app = this.ninvapp;
    domain.zap = this.ninvzap;
    domain.lain = this.cinvlain;
    domain.scan1 = this.cinvscan1;
    domain.scan2 = this.cinvscan2;
    domain.scan3 = this.cinvscan3;
    domain.scan4 = this.cinvscan4;
    domain.inv12 = this.ninv12;
    domain.canvas = this.ninvcanvas;
    domain.tambah = this.cinvtambah;
    domain.fee = Number(this.ninvfee);
    domain.kode = this.cinvkode;
    domain.cap = this.cinvcap;
    domain.ket = this.cinvket;
    domain.jasa = this.cinvjasa;
    domain.tidak = this.ninvtidak;
    domain.namapc = this.cinvnamapc;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<Invoice>): InvoiceTypeOrmEntity {
    const entity = new InvoiceTypeOrmEntity();
    if (domain.id) entity.cINVpk = domain.id;
    if (domain.refNo !== undefined) entity.cINVrefno = domain.refNo ?? null;
    entity.dINVdate = domain.date ?? null;
    entity.cINVfkENT = domain.entityId ?? null;
    // Use default values from database schema if null/undefined
    entity.cINVfkSAM = domain.salesmanId ?? '..default..............'; // Default: '..default..............'
    entity.cINVfkWHS = domain.warehouseId ?? null;
    entity.cINVfkEXC = domain.exchangeId ?? '..rupiah...............'; // Default: '..rupiah...............'
    entity.nINVcash = domain.isCash ? 1 : 0;
    entity.dINVdue = domain.dueDate ?? null;
    // Use default values from database schema if null/undefined
    entity.cinvserie = domain.serie ?? ' '; // Default: ' '
    entity.cinvtaxinv = domain.taxInvoice ?? ' '; // Default: ' '
    entity.cinvpo = domain.po ?? ' '; // Default: ' '
    entity.cinvremark = domain.remark ?? ' '; // Default: ' '
    entity.nINVdisc1 = domain.discount1 ?? 0;
    entity.nINVdisc2 = domain.discount2 ?? 0;
    entity.nINVdisc3 = domain.discount3 ?? 0;
    entity.nINVdisc = domain.discount ?? 0;
    entity.nINVtax = domain.tax ?? 0;
    entity.nINVpaid = domain.isPaid ? 1 : 0;
    entity.cINVuser = domain.user ?? null;
    entity.cINVspecial = domain.special ?? null;
    entity.cINVTransfer = domain.transfer ?? 'n/a'; // Default: 'n/a'
    entity.dINVtaxdate = domain.taxDate ?? null;
    entity.nINVfreight = domain.freight ?? 0;
    entity.cInvFkEntCode = domain.entityCode ?? null;
    entity.nInvOpening = domain.opening ?? 0;
    entity.cinvremark1 = domain.remark1 ?? ' '; // Default: ' '
    entity.cInvReturnto = domain.returnTo ?? ''; // Default: ''
    entity.ninvoption = domain.option ?? 0;
    entity.ninvcetak = domain.cetak ?? 0;
    entity.nINVdp = domain.dp ?? 0;
    entity.nINVvoucher = domain.voucher ?? 0;
    entity.nINVtunai = domain.tunai ?? 0;
    entity.nINVpiutang = domain.piutang ?? 0;
    entity.nINVCredit = domain.credit ?? 0;
    entity.nINVdebit = domain.debit ?? 0;
    entity.nINVjam = domain.jam ?? 0;
    entity.ninvno_card = domain.noCard ?? null;
    entity.ninvjenis_card = domain.jenisCard ?? null;
    entity.ninvccard_nama = domain.ccardNama ?? null;
    entity.ninvccard_oto = domain.ccardOto ?? null;
    entity.nINVccard_nilai = domain.ccardNilai ?? 0;
    entity.nINVkembali = domain.kembali ?? 0;
    entity.serino = domain.serialNumber ?? null;
    entity.xkirim = domain.xkirim ?? 0;
    entity.kunci = domain.kunci ?? 0;
    entity.oleh = domain.oleh ?? null;
    entity.ninvpoint = domain.point ?? 0;
    entity.nINVpax = domain.pax ?? 0;
    entity.cINVdine = domain.dine ?? null;
    entity.nINVvalue = domain.value ?? 0;
    entity.npostransfer = domain.postransfer ?? 0;
    entity.cINVhadiah = domain.hadiah ?? null;
    entity.cinvmeja = domain.meja ?? null;
    entity.cINVfkMOB = domain.mobileId ?? null;
    entity.nINVpromov = domain.promoValue ?? 0;
    entity.nINVpromod = domain.promoDiscount ?? 0;
    entity.nINVpromos = domain.promoSales ?? 0;
    entity.cINVsedan = domain.sedan ?? null;
    entity.nINVkm = domain.km ?? 0;
    entity.cINVsedancode = domain.sedanCode ?? null;
    entity.niNVpawal = domain.pawal ?? 0;
    entity.okirim = domain.okirim ?? null;
    entity.nINVrate = domain.rate ?? 1.0;
    entity.nIVDtime = domain.ivdTime ?? null;
    entity.ninvcetak1 = domain.cetak1 ?? 0;
    entity.cINVfkKLI = domain.clientId ?? null;
    entity.cINVfkPOS = domain.posId ?? null;
    entity.cINVfkCAM = domain.camId ?? null;
    entity.cINVpromog = domain.promog ?? null;
    entity.nINVwaste = domain.waste ?? 0;
    entity.nINVgratis = domain.gratis ?? 0;
    entity.cinvsj = domain.sj ?? null;
    entity.dinvtglsj = domain.tglSj ?? null;
    entity.ninvpilih = domain.pilih ?? 0;
    entity.nINVvalue1 = domain.value1 ?? 0;
    entity.ninvratep = domain.ratep ?? 1.0;
    entity.cinvepajak = domain.epajak ?? null;
    entity.ninvpersen = domain.persen ?? 0;
    entity.ninvmobile = domain.mobile ?? 0;
    entity.ninvfg = domain.fg ?? 0;
    entity.ninvpo = domain.poAmount ?? 0;
    entity.ninvexpire = domain.expire ?? 0;
    entity.ninvapp = domain.app ?? 0;
    entity.ninvzap = domain.zap ?? 0;
    entity.cinvlain = domain.lain ?? null;
    entity.cinvscan1 = domain.scan1 ?? null;
    entity.cinvscan2 = domain.scan2 ?? null;
    entity.cinvscan3 = domain.scan3 ?? null;
    entity.cinvscan4 = domain.scan4 ?? null;
    entity.ninv12 = domain.inv12 ?? 1;
    entity.ninvcanvas = domain.canvas ?? '01';
    entity.cinvtambah = domain.tambah ?? null;
    entity.ninvfee = domain.fee ?? 0;
    entity.cinvkode = domain.kode ?? '04';
    entity.cinvcap = domain.cap ?? null;
    entity.cinvket = domain.ket ?? null;
    entity.cinvjasa = domain.jasa ?? 'A';
    entity.ninvtidak = domain.tidak ?? 0;
    entity.cinvnamapc = domain.namapc ?? null;
    return entity;
  }
}

