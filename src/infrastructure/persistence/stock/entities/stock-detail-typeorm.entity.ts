import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StockDetail } from '../../../../core/stock/entities/stock-detail.entity';
import { StockTypeOrmEntity } from './stock-typeorm.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('stockdetail')
@Index('cSTDfkSTK', ['cSTDfkSTK'])
@Index('cSTDfkUNI', ['cSTDfkUNI'])
@Index('cSTDcode', ['cSTDcode'])
@Index('serino', ['serino'])
export class StockDetailTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cSTDpk' })
  cSTDpk: string;

  @Column({ type: 'char', length: 23, name: 'cSTDfkSTK' })
  cSTDfkSTK: string;

  @Column({ type: 'char', length: 23, name: 'cSTDfkUNI' })
  cSTDfkUNI: string;

  @Column({ type: 'decimal', precision: 10, scale: 4, name: 'nSTDfactor', nullable: true })
  nSTDfactor: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTDprice', nullable: true })
  nSTDprice: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTDretail', nullable: true })
  nSTDretail: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTDxprice', nullable: true })
  nSTDxprice: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTDprice1', nullable: true })
  nSTDprice1: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTDprice2', nullable: true })
  nSTDprice2: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTDprice3', nullable: true })
  nSTDprice3: number | null;

  @Column({ type: 'char', length: 20, name: 'cSTDcode' })
  cSTDcode: string;

  @Column({ type: 'date', name: 'dSTDdari', nullable: true })
  dSTDdari: Date | null;

  @Column({ type: 'date', name: 'dSTDke', nullable: true })
  dSTDke: Date | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nSTDdisc', nullable: true })
  nSTDdisc: number | null;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nSTDdiscp', nullable: true })
  nSTDdiscp: number | null;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  @Column({ type: 'decimal', precision: 17, scale: 2, name: 'nSTDoprice', nullable: true })
  nSTDoprice: number | null;

  @Column({ type: 'decimal', precision: 17, scale: 2, name: 'nSTDoxprice', nullable: true })
  nSTDoxprice: number | null;

  @Column({ type: 'decimal', precision: 17, scale: 2, name: 'nSTDoprice1', nullable: true })
  nSTDoprice1: number | null;

  @Column({ type: 'decimal', precision: 17, scale: 2, name: 'nSTDoprice2', nullable: true })
  nSTDoprice2: number | null;

  @Column({ type: 'decimal', precision: 17, scale: 2, name: 'nSTDoprice3', nullable: true })
  nSTDoprice3: number | null;

  @Column({ type: 'decimal', precision: 17, scale: 2, name: 'nSTDoretail', nullable: true })
  nSTDoretail: number | null;

  @Column({ type: 'int', name: 'nstdkey', nullable: true })
  nstdkey: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nSTDven', nullable: true })
  nSTDven: number | null;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nSTDvenp', nullable: true })
  nSTDvenp: number | null;

  @Column({ type: 'date', name: 'dstddari1', nullable: true })
  dstddari1: Date | null;

  @Column({ type: 'date', name: 'dstdke1', nullable: true })
  dstdke1: Date | null;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nstddiscp1', nullable: true })
  nstddiscp1: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nstddisc1', nullable: true })
  nstddisc1: number | null;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nstdvenp1', nullable: true })
  nstdvenp1: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nstdven1', nullable: true })
  nstdven1: number | null;

  @Column({ type: 'varchar', length: 23, name: 'cstdpromo1', nullable: true })
  cstdpromo1: string | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet01', nullable: true })
  outlet01: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet02', nullable: true })
  outlet02: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet03', nullable: true })
  outlet03: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet04', nullable: true })
  outlet04: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet05', nullable: true })
  outlet05: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet06', nullable: true })
  outlet06: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet07', nullable: true })
  outlet07: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet08', nullable: true })
  outlet08: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet09', nullable: true })
  outlet09: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet10', nullable: true })
  outlet10: number | null;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nhrgbaru', default: 0.0 })
  nhrgbaru: number;

  @Column({ type: 'date', name: 'dtglbaru', nullable: true })
  dtglbaru: Date | null;

  @Column({ type: 'date', name: 'dtgledit', nullable: true })
  dtgledit: Date | null;

  @Column({ type: 'text', name: 'oleh', nullable: true })
  oleh: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'hargamin', default: 0.0 })
  hargamin: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'hargamax', default: 0.0 })
  hargamax: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet11', default: 0.0 })
  outlet11: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet12', default: 0.0 })
  outlet12: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet13', default: 0.0 })
  outlet13: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet14', default: 0.0 })
  outlet14: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet15', default: 0.0 })
  outlet15: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet16', default: 0.0 })
  outlet16: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet17', default: 0.0 })
  outlet17: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet18', default: 0.0 })
  outlet18: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet19', default: 0.0 })
  outlet19: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'outlet20', default: 0.0 })
  outlet20: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nstdmark', default: 0.0 })
  nstdmark: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nstdfee', default: 0.0 })
  nstdfee: number;

  @Column({ type: 'varchar', length: 20, name: 'cstdinternal', default: '' })
  cstdinternal: string;

  @Column({ type: 'varchar', length: 10, name: 'cstdunit', default: '' })
  cstdunit: string;

  @ManyToOne(() => StockTypeOrmEntity, (stock) => stock.stockDetails)
  @JoinColumn({ name: 'cSTDfkSTK' })
  stock: StockTypeOrmEntity;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): StockDetail {
    const domain = new StockDetail();
    domain.id = this.cSTDpk;
    domain.stockId = this.cSTDfkSTK;
    domain.unitId = this.cSTDfkUNI;
    domain.conversionFactor = this.nSTDfactor;
    domain.price = this.nSTDprice;
    domain.retailPrice = this.nSTDretail;
    domain.priceDollar = this.nSTDxprice;
    domain.price1 = this.nSTDprice1;
    domain.price2 = this.nSTDprice2;
    domain.price3 = this.nSTDprice3;
    domain.code = this.cSTDcode;
    domain.validFrom = this.dSTDdari;
    domain.validTo = this.dSTDke;
    domain.discount = this.nSTDdisc;
    domain.discountPercentage = this.nSTDdiscp;
    domain.serialNumber = this.serino;
    domain.originalPrice = this.nSTDoprice;
    domain.originalPriceDollar = this.nSTDoxprice;
    domain.originalPrice1 = this.nSTDoprice1;
    domain.originalPrice2 = this.nSTDoprice2;
    domain.originalPrice3 = this.nSTDoprice3;
    domain.originalRetailPrice = this.nSTDoretail;
    domain.key = this.nstdkey;
    domain.vendorDiscount = this.nSTDven;
    domain.vendorDiscountPercentage = this.nSTDvenp;
    domain.validFrom1 = this.dstddari1;
    domain.validTo1 = this.dstdke1;
    domain.discountPercentage1 = this.nstddiscp1;
    domain.discount1 = this.nstddisc1;
    domain.vendorDiscountPercentage1 = this.nstdvenp1;
    domain.vendorDiscount1 = this.nstdven1;
    domain.promoCode1 = this.cstdpromo1;
    domain.outlet01 = this.outlet01;
    domain.outlet02 = this.outlet02;
    domain.outlet03 = this.outlet03;
    domain.outlet04 = this.outlet04;
    domain.outlet05 = this.outlet05;
    domain.outlet06 = this.outlet06;
    domain.outlet07 = this.outlet07;
    domain.outlet08 = this.outlet08;
    domain.outlet09 = this.outlet09;
    domain.outlet10 = this.outlet10;
    domain.newPrice = this.nhrgbaru;
    domain.newPriceDate = this.dtglbaru;
    domain.editDate = this.dtgledit;
    domain.editedBy = this.oleh;
    domain.minimumPrice = this.hargamin;
    domain.maximumPrice = this.hargamax;
    domain.outlet11 = this.outlet11;
    domain.outlet12 = this.outlet12;
    domain.outlet13 = this.outlet13;
    domain.outlet14 = this.outlet14;
    domain.outlet15 = this.outlet15;
    domain.outlet16 = this.outlet16;
    domain.outlet17 = this.outlet17;
    domain.outlet18 = this.outlet18;
    domain.outlet19 = this.outlet19;
    domain.outlet20 = this.outlet20;
    domain.markup = this.nstdmark;
    domain.fee = this.nstdfee;
    domain.internalCode = this.cstdinternal || null;
    domain.unit = this.cstdunit || null;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<StockDetail>): StockDetailTypeOrmEntity {
    const entity = new StockDetailTypeOrmEntity();
    if (domain.id) entity.cSTDpk = domain.id;
    if (domain.stockId !== undefined) entity.cSTDfkSTK = domain.stockId;
    if (domain.unitId !== undefined) entity.cSTDfkUNI = domain.unitId;
    if (domain.conversionFactor !== undefined) entity.nSTDfactor = domain.conversionFactor;
    if (domain.price !== undefined) entity.nSTDprice = domain.price;
    if (domain.retailPrice !== undefined) entity.nSTDretail = domain.retailPrice;
    if (domain.priceDollar !== undefined) entity.nSTDxprice = domain.priceDollar;
    if (domain.price1 !== undefined) entity.nSTDprice1 = domain.price1;
    if (domain.price2 !== undefined) entity.nSTDprice2 = domain.price2;
    if (domain.price3 !== undefined) entity.nSTDprice3 = domain.price3;
    if (domain.code !== undefined) entity.cSTDcode = domain.code;
    if (domain.validFrom !== undefined) entity.dSTDdari = domain.validFrom;
    if (domain.validTo !== undefined) entity.dSTDke = domain.validTo;
    if (domain.discount !== undefined) entity.nSTDdisc = domain.discount;
    if (domain.discountPercentage !== undefined) entity.nSTDdiscp = domain.discountPercentage;
    if (domain.serialNumber !== undefined) entity.serino = domain.serialNumber;
    if (domain.originalPrice !== undefined) entity.nSTDoprice = domain.originalPrice;
    if (domain.originalPriceDollar !== undefined) entity.nSTDoxprice = domain.originalPriceDollar;
    if (domain.originalPrice1 !== undefined) entity.nSTDoprice1 = domain.originalPrice1;
    if (domain.originalPrice2 !== undefined) entity.nSTDoprice2 = domain.originalPrice2;
    if (domain.originalPrice3 !== undefined) entity.nSTDoprice3 = domain.originalPrice3;
    if (domain.originalRetailPrice !== undefined) entity.nSTDoretail = domain.originalRetailPrice;
    if (domain.key !== undefined) entity.nstdkey = domain.key;
    if (domain.vendorDiscount !== undefined) entity.nSTDven = domain.vendorDiscount;
    if (domain.vendorDiscountPercentage !== undefined) entity.nSTDvenp = domain.vendorDiscountPercentage;
    if (domain.validFrom1 !== undefined) entity.dstddari1 = domain.validFrom1;
    if (domain.validTo1 !== undefined) entity.dstdke1 = domain.validTo1;
    if (domain.discountPercentage1 !== undefined) entity.nstddiscp1 = domain.discountPercentage1;
    if (domain.discount1 !== undefined) entity.nstddisc1 = domain.discount1;
    if (domain.vendorDiscountPercentage1 !== undefined) entity.nstdvenp1 = domain.vendorDiscountPercentage1;
    if (domain.vendorDiscount1 !== undefined) entity.nstdven1 = domain.vendorDiscount1;
    if (domain.promoCode1 !== undefined) entity.cstdpromo1 = domain.promoCode1;
    if (domain.outlet01 !== undefined) entity.outlet01 = domain.outlet01;
    if (domain.outlet02 !== undefined) entity.outlet02 = domain.outlet02;
    if (domain.outlet03 !== undefined) entity.outlet03 = domain.outlet03;
    if (domain.outlet04 !== undefined) entity.outlet04 = domain.outlet04;
    if (domain.outlet05 !== undefined) entity.outlet05 = domain.outlet05;
    if (domain.outlet06 !== undefined) entity.outlet06 = domain.outlet06;
    if (domain.outlet07 !== undefined) entity.outlet07 = domain.outlet07;
    if (domain.outlet08 !== undefined) entity.outlet08 = domain.outlet08;
    if (domain.outlet09 !== undefined) entity.outlet09 = domain.outlet09;
    if (domain.outlet10 !== undefined) entity.outlet10 = domain.outlet10;
    if (domain.newPrice !== undefined) entity.nhrgbaru = domain.newPrice;
    if (domain.newPriceDate !== undefined) entity.dtglbaru = domain.newPriceDate;
    if (domain.editDate !== undefined) entity.dtgledit = domain.editDate;
    if (domain.editedBy !== undefined) entity.oleh = domain.editedBy;
    if (domain.minimumPrice !== undefined) entity.hargamin = domain.minimumPrice;
    if (domain.maximumPrice !== undefined) entity.hargamax = domain.maximumPrice;
    if (domain.outlet11 !== undefined) entity.outlet11 = domain.outlet11;
    if (domain.outlet12 !== undefined) entity.outlet12 = domain.outlet12;
    if (domain.outlet13 !== undefined) entity.outlet13 = domain.outlet13;
    if (domain.outlet14 !== undefined) entity.outlet14 = domain.outlet14;
    if (domain.outlet15 !== undefined) entity.outlet15 = domain.outlet15;
    if (domain.outlet16 !== undefined) entity.outlet16 = domain.outlet16;
    if (domain.outlet17 !== undefined) entity.outlet17 = domain.outlet17;
    if (domain.outlet18 !== undefined) entity.outlet18 = domain.outlet18;
    if (domain.outlet19 !== undefined) entity.outlet19 = domain.outlet19;
    if (domain.outlet20 !== undefined) entity.outlet20 = domain.outlet20;
    if (domain.markup !== undefined) entity.nstdmark = domain.markup;
    if (domain.fee !== undefined) entity.nstdfee = domain.fee;
    if (domain.internalCode !== undefined) entity.cstdinternal = domain.internalCode || '';
    if (domain.unit !== undefined) entity.cstdunit = domain.unit || '';
    return entity;
  }
}

