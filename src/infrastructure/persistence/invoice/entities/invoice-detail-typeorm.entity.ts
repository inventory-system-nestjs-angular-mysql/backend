import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { InvoiceDetail } from '../../../../core/invoice/entities/invoice-detail.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('invoicedetail')
@Index('cIVDfkINV', ['cIVDfkINV'])
@Index('cIVDfkSTK', ['cIVDfkSTK'])
@Index('nIVDaccqty', ['nIVDaccqty'])
@Index('nIVDaccent', ['nIVDaccent'])
@Index('cIVDfkporder', ['cIVDfkporder'])
@Index('nCost', ['nCost'])
@Index('nIVDAccQtyTransfer', ['nIVDAccQtyTransfer'])
@Index('serino', ['serino'])
export class InvoiceDetailTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cIVDpk', default: 'def' })
  cIVDpk: string;

  @Column({ type: 'char', length: 23, name: 'cIVDfkINV', default: 'def' })
  cIVDfkINV: string;

  @Column({ type: 'char', length: 23, name: 'cIVDfkSTK', default: 'def' })
  cIVDfkSTK: string | null;

  @Column({ type: 'decimal', precision: 17, scale: 3, name: 'nIVDqtyin', default: 0.0 })
  nIVDqtyin: number;

  @Column({ type: 'decimal', precision: 17, scale: 3, name: 'nIVDqtyout', default: 0.0 })
  nIVDqtyout: number;

  @Column({ type: 'decimal', precision: 17, scale: 3, name: 'nIVDzqtyin', default: 0.0 })
  nIVDzqtyin: number;

  @Column({ type: 'decimal', precision: 17, scale: 3, name: 'nIVDzqtyout', default: 0.0 })
  nIVDzqtyout: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nIVDprice', default: 0.0 })
  nIVDprice: number;

  @Column({ type: 'decimal', precision: 9, scale: 5, name: 'nIVDdisc1', default: 0.0 })
  nIVDdisc1: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nIVDdisc2', default: 0.0 })
  nIVDdisc2: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nIVDdisc3', default: 0.0 })
  nIVDdisc3: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nIVDdisc', default: 0.0 })
  nIVDdisc: number;

  @Column({ type: 'decimal', precision: 3, scale: 0, name: 'nIVDaccqty', default: 0, comment: 'accumulation for stock' })
  nIVDaccqty: number;

  @Column({ type: 'decimal', precision: 3, scale: 0, name: 'nIVDaccent', default: 0, comment: 'accumulation for entity' })
  nIVDaccent: number;

  @Column({ type: 'int', unsigned: true, name: 'nIVDorder', default: 0 })
  nIVDorder: number;

  @Column({ type: 'varchar', length: 20, name: 'cIVDcode', default: 'def', comment: 'Stock Code' })
  cIVDcode: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 4, name: 'nIvdFactor', default: 0.0 })
  nIvdFactor: number;

  @Column({ type: 'int', name: 'nivdsplit', default: 0 })
  nivdsplit: number;

  @Column({ type: 'varchar', length: 40, name: 'cIVDunit', default: 'def' })
  cIVDunit: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 3, name: 'nIVDAmount', nullable: true })
  nIVDAmount: number | null;

  @Column({ type: 'decimal', precision: 3, scale: 0, name: 'nIVDAccQtyTransfer', default: 0 })
  nIVDAccQtyTransfer: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nIVDonHand', default: 0.0 })
  nIVDonHand: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nIVDadjust', default: 0.0 })
  nIVDadjust: number;

  @Column({ type: 'char', length: 23, name: 'cIVDfkporder', default: '' })
  cIVDfkporder: string | null;

  @Column({ type: 'int', unsigned: true, name: 'nCost', default: 0 })
  nCost: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nIVDpokok', default: 0.0 })
  nIVDpokok: number;

  @Column({ type: 'int', name: 'nIVDstkppn', default: 0 })
  nIVDstkppn: number;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  @Column({ type: 'int', unsigned: true, name: 'xkirim', nullable: true })
  xkirim: number | null;

  @Column({ type: 'text', name: 'cIVDsn', nullable: true })
  cIVDsn: string | null;

  @Column({ type: 'text', name: 'cIVDmemo', nullable: true })
  cIVDmemo: string | null;

  @Column({ type: 'int', name: 'nIVDkirim', default: 1 })
  nIVDkirim: number;

  @Column({ type: 'varchar', length: 23, name: 'civdid1', default: ' ' })
  civdid1: string | null;

  @Column({ type: 'varchar', length: 23, name: 'civdid2', default: ' ' })
  civdid2: string | null;

  @Column({ type: 'varchar', length: 23, name: 'civdid3', default: ' ' })
  civdid3: string | null;

  @Column({ type: 'varchar', length: 15, name: 'civdbatch', default: ' ' })
  civdbatch: string | null;

  @Column({ type: 'date', name: 'divdexpire', nullable: true })
  divdexpire: Date | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nIVDven', default: 0.0 })
  nIVDven: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nIVDvenp', default: 0.0 })
  nIVDvenp: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nIVDven1', default: 0.0 })
  nIVDven1: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nIVDvenp1', default: 0.0 })
  nIVDvenp1: number;

  @Column({ type: 'varchar', length: 15, name: 'cIVDpromocard', nullable: true })
  cIVDpromocard: string | null;

  @Column({ type: 'int', name: 'nIVDinipromo', default: 0 })
  nIVDinipromo: number;

  @Column({ type: 'varchar', length: 5, name: 'cIVDresep', nullable: true })
  cIVDresep: string | null;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nivdpersen', default: 0.0 })
  nivdpersen: number;

  @Column({ type: 'date', name: 'divdtgl', nullable: true })
  divdtgl: Date | null;

  @Column({ type: 'varchar', length: 20, name: 'civdnota', nullable: true })
  civdnota: string | null;

  @Column({ type: 'decimal', precision: 11, scale: 2, name: 'nivdpo', default: 0.0 })
  nivdpo: number;

  @Column({ type: 'varchar', length: 23, name: 'civdfkstk1', nullable: true })
  civdfkstk1: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'qtyresep', default: 0.0 })
  qtyresep: number;

  @Column({ type: 'int', name: 'nivdedit', default: 0 })
  nivdedit: number;

  @Column({ type: 'varchar', length: 40, name: 'disct', nullable: true })
  disct: string | null;

  @Column({ type: 'int', name: 'nivdpilih1', default: 0 })
  nivdpilih1: number;

  @Column({ type: 'int', name: 'nivdpilih2', default: 0 })
  nivdpilih2: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'nivddiscx', default: 0.0 })
  nivddiscx: number;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): InvoiceDetail {
    const domain = new InvoiceDetail();
    domain.id = this.cIVDpk;
    domain.invoiceId = this.cIVDfkINV;
    domain.stockId = this.cIVDfkSTK;
    domain.qtyIn = Number(this.nIVDqtyin);
    domain.qtyOut = Number(this.nIVDqtyout);
    domain.zQtyIn = Number(this.nIVDzqtyin);
    domain.zQtyOut = Number(this.nIVDzqtyout);
    domain.price = Number(this.nIVDprice);
    domain.disc1 = Number(this.nIVDdisc1);
    domain.disc2 = Number(this.nIVDdisc2);
    domain.disc3 = Number(this.nIVDdisc3);
    domain.disc = Number(this.nIVDdisc);
    domain.accQty = Number(this.nIVDaccqty);
    domain.accEnt = Number(this.nIVDaccent);
    domain.order = this.nIVDorder;
    domain.code = this.cIVDcode;
    domain.factor = Number(this.nIvdFactor);
    domain.ivdSplit = this.nivdsplit ?? 0;
    domain.unit = this.cIVDunit;
    domain.amount = this.nIVDAmount ? Number(this.nIVDAmount) : null;
    domain.accQtyTransfer = Number(this.nIVDAccQtyTransfer);
    domain.onHand = Number(this.nIVDonHand);
    domain.adjust = Number(this.nIVDadjust);
    domain.porderId = this.cIVDfkporder;
    domain.cost = this.nCost;
    domain.pokok = Number(this.nIVDpokok);
    domain.stkppn = this.nIVDstkppn;
    domain.serialNumber = this.serino;
    domain.xkirim = this.xkirim;
    domain.sn = this.cIVDsn;
    domain.memo = this.cIVDmemo;
    domain.kirim = this.nIVDkirim;
    domain.id1 = this.civdid1;
    domain.id2 = this.civdid2;
    domain.id3 = this.civdid3;
    domain.batch = this.civdbatch;
    domain.expire = this.divdexpire;
    domain.ven = Number(this.nIVDven);
    domain.venp = Number(this.nIVDvenp);
    domain.ven1 = Number(this.nIVDven1);
    domain.venp1 = Number(this.nIVDvenp1);
    domain.promoCard = this.cIVDpromocard;
    domain.inipromo = this.nIVDinipromo;
    domain.resep = this.cIVDresep;
    domain.persen = Number(this.nivdpersen);
    domain.tgl = this.divdtgl;
    domain.nota = this.civdnota;
    domain.po = Number(this.nivdpo);
    domain.stockId1 = this.civdfkstk1;
    domain.qtyResep = Number(this.qtyresep);
    domain.edit = this.nivdedit;
    domain.disct = this.disct;
    domain.pilih1 = this.nivdpilih1;
    domain.pilih2 = this.nivdpilih2;
    domain.discx = Number(this.nivddiscx);
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<InvoiceDetail>): InvoiceDetailTypeOrmEntity {
    const entity = new InvoiceDetailTypeOrmEntity();
    if (domain.id) entity.cIVDpk = domain.id;
    entity.cIVDfkINV = domain.invoiceId!;
    entity.cIVDfkSTK = domain.stockId ?? null;
    entity.nIVDqtyin = domain.qtyIn ?? 0;
    entity.nIVDqtyout = domain.qtyOut ?? 0;
    entity.nIVDzqtyin = domain.zQtyIn ?? 0;
    entity.nIVDzqtyout = domain.zQtyOut ?? 0;
    entity.nIVDprice = domain.price ?? 0;
    entity.nIVDdisc1 = domain.disc1 ?? 0;
    entity.nIVDdisc2 = domain.disc2 ?? 0;
    entity.nIVDdisc3 = domain.disc3 ?? 0;
    entity.nIVDdisc = domain.disc ?? 0;
    entity.nIVDaccqty = domain.accQty ?? 0;
    entity.nIVDaccent = domain.accEnt ?? 0;
    entity.nIVDorder = domain.order ?? 0;
    entity.cIVDcode = domain.code ?? null;
    entity.nIvdFactor = domain.factor ?? 0;
    entity.nivdsplit = domain.ivdSplit ?? 0;
    entity.cIVDunit = domain.unit ?? null;
    entity.nIVDAmount = domain.amount ?? null;
    entity.nIVDAccQtyTransfer = domain.accQtyTransfer ?? 0;
    entity.nIVDonHand = domain.onHand ?? 0;
    entity.nIVDadjust = domain.adjust ?? 0;
    entity.cIVDfkporder = domain.porderId ?? null;
    entity.nCost = domain.cost ?? 0;
    entity.nIVDpokok = domain.pokok ?? 0;
    entity.nIVDstkppn = domain.stkppn ?? 0;
    entity.serino = domain.serialNumber ?? null;
    entity.xkirim = domain.xkirim ?? null;
    entity.cIVDsn = domain.sn ?? null;
    entity.cIVDmemo = domain.memo ?? null;
    entity.nIVDkirim = domain.kirim ?? 1;
    entity.civdid1 = domain.id1 ?? null;
    entity.civdid2 = domain.id2 ?? null;
    entity.civdid3 = domain.id3 ?? null;
    entity.civdbatch = domain.batch ?? null;
    entity.divdexpire = domain.expire ?? null;
    entity.nIVDven = domain.ven ?? 0;
    entity.nIVDvenp = domain.venp ?? 0;
    entity.nIVDven1 = domain.ven1 ?? 0;
    entity.nIVDvenp1 = domain.venp1 ?? 0;
    entity.cIVDpromocard = domain.promoCard ?? null;
    entity.nIVDinipromo = domain.inipromo ?? 0;
    entity.cIVDresep = domain.resep ?? null;
    entity.nivdpersen = domain.persen ?? 0;
    entity.divdtgl = domain.tgl ?? null;
    entity.civdnota = domain.nota ?? null;
    entity.nivdpo = domain.po ?? 0;
    entity.civdfkstk1 = domain.stockId1 ?? null;
    entity.qtyresep = domain.qtyResep ?? 0;
    entity.nivdedit = domain.edit ?? 0;
    entity.disct = domain.disct ?? null;
    entity.nivdpilih1 = domain.pilih1 ?? 0;
    entity.nivdpilih2 = domain.pilih2 ?? 0;
    entity.nivddiscx = domain.discx ?? 0;
    return entity;
  }
}

