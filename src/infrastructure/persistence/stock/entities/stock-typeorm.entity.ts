import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Stock } from '../../../../core/stock/entities/stock.entity';
import { StockDetailTypeOrmEntity } from './stock-detail-typeorm.entity';
import { StockGroupTypeOrmEntity } from '../../stockgroup/entities/stockgroup-typeorm.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('stock')
@Index('cSTKdesc', ['cSTKdesc'])
@Index('cSTKfkGRP', ['cSTKfkGRP'])
@Index('cSTKfkENT', ['cSTKfkENT'])
@Index('cSTKfkBRD', ['cSTKfkBRD'])
@Index('serino', ['serino'])
export class StockTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cSTKpk' })
  cSTKpk: string;

  @Column({ type: 'varchar', length: 60, name: 'cSTKdesc', default: ' ' })
  cSTKdesc: string;

  @Column({ type: 'char', length: 23, name: 'cSTKfkGRP', default: '' })
  cSTKfkGRP: string;

  @ManyToOne(() => StockGroupTypeOrmEntity, { nullable: true, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'cSTKfkGRP', referencedColumnName: 'cGRPpk' })
  stockGroup: StockGroupTypeOrmEntity | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nSTKmin', default: 0.0 })
  nSTKmin: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nSTKmax', default: 0.0 })
  nSTKmax: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTKbuy', default: 0.0 })
  nSTKbuy: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTKcogs', default: 0.0 })
  nSTKcogs: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTKxbuy', default: 0.0 })
  nSTKxbuy: number;

  @Column({ type: 'decimal', precision: 16, scale: 3, name: 'nSTKxcogs', default: 0.0 })
  nSTKxcogs: number;

  @Column({ type: 'char', length: 23, name: 'cSTKfkENT', default: '' })
  cSTKfkENT: string;

  @Column({ type: 'int', name: 'nSTKservice', default: 0 })
  nSTKservice: number;

  @Column({ type: 'char', length: 23, name: 'cSTKfkBRD', default: '' })
  cSTKfkBRD: string;

  @Column({ type: 'varchar', length: 40, name: 'cSTKsize', default: ' ' })
  cSTKsize: string;

  @Column({ type: 'varchar', length: 40, name: 'cSTKcolor', default: ' ' })
  cSTKcolor: string;

  @Column({ type: 'int', name: 'nSTKsuspend', default: 0 })
  nSTKsuspend: number;

  @Column({ type: 'text', name: 'cSTKmemo', nullable: true })
  cSTKmemo: string | null;

  @Column({ type: 'date', name: 'dSTKlast', nullable: true })
  dSTKlast: Date | null;

  @Column({ type: 'varchar', length: 45, name: 'cSTKimage', default: ' ' })
  cSTKimage: string;

  @Column({ type: 'int', name: 'nSTKopen', default: 0 })
  nSTKopen: number;

  @Column({ type: 'int', name: 'nSTKPPN', default: 0 })
  nSTKPPN: number;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  @Column({ type: 'varchar', length: 10, name: 'cSTKrak', default: ' ' })
  cSTKrak: string;

  @Column({ type: 'int', name: 'cSTKcopy', default: 0 })
  cSTKcopy: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nSTKMark1', default: 0.0 })
  nSTKMark1: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nSTKMark2', default: 0.0 })
  nSTKMark2: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nSTKMark3', default: 0.0 })
  nSTKMark3: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nSTKMark4', default: 0.0 })
  nSTKMark4: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nSTKMark5', default: 0.0 })
  nSTKMark5: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nSTKMark6', default: 0.0 })
  nSTKMark6: number;

  @Column({ type: 'int', name: 'nSTKbaku', default: 2 })
  nSTKbaku: number;

  @Column({ type: 'int', name: 'nSTKmisc', default: 0 })
  nSTKmisc: number;

  @Column({ type: 'int', name: 'nSTKsnack', default: 0 })
  nSTKsnack: number;

  @Column({ type: 'int', name: 'nSTKfood', default: 0 })
  nSTKfood: number;

  @Column({ type: 'int', name: 'nSTKcomp', default: 0 })
  nSTKcomp: number;

  @Column({ type: 'int', name: 'nSTKbeverage', default: 0 })
  nSTKbeverage: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nstkmin1', default: 0.0 })
  nstkmin1: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nstkmax1', default: 0.0 })
  nstkmax1: number;

  @Column({ type: 'date', name: 'dSTKgift1', nullable: true })
  dSTKgift1: Date | null;

  @Column({ type: 'date', name: 'dSTKgift2', nullable: true })
  dSTKgift2: Date | null;

  @Column({ type: 'varchar', length: 23, name: 'cSTKgift', default: ' ' })
  cSTKgift: string;

  @Column({ type: 'varchar', length: 20, name: 'nSTKpart1', default: ' ' })
  nSTKpart1: string;

  @Column({ type: 'varchar', length: 20, name: 'nSTKpart2', default: ' ' })
  nSTKpart2: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk11', default: 0.0 })
  cstk11: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk12', default: 0.0 })
  cstk12: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk13', default: 0.0 })
  cstk13: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk21', default: 0.0 })
  cstk21: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk22', default: 0.0 })
  cstk22: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk23', default: 0.0 })
  cstk23: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk31', default: 0.0 })
  cstk31: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk32', default: 0.0 })
  cstk32: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk33', default: 0.0 })
  cstk33: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk41', default: 0.0 })
  cstk41: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk42', default: 0.0 })
  cstk42: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'cstk43', default: 0.0 })
  cstk43: number;

  @Column({ type: 'date', name: 'dstkexpire', nullable: true })
  dstkexpire: Date | null;

  @Column({ type: 'int', name: 'nSTKkitchen1', default: 0 })
  nSTKkitchen1: number;

  @Column({ type: 'int', name: 'nSTKkitchen2', default: 0 })
  nSTKkitchen2: number;

  @Column({ type: 'int', name: 'nSTKkitchen3', default: 0 })
  nSTKkitchen3: number;

  @Column({ type: 'int', name: 'nSTKkitchen4', default: 0 })
  nSTKkitchen4: number;

  @Column({ type: 'int', name: 'nSTKkitchen5', default: 0 })
  nSTKkitchen5: number;

  @Column({ type: 'int', name: 'nSTKpcs', default: 0 })
  nSTKpcs: number;

  @Column({ type: 'int', name: 'nSTKbulat', default: 0 })
  nSTKbulat: number;

  @Column({ type: 'decimal', precision: 6, scale: 3, name: 'nstkkomisi', default: 0.0 })
  nstkkomisi: number;

  @Column({ type: 'int', name: 'nstkfast', default: 0 })
  nstkfast: number;

  @Column({ type: 'int', name: 'cSTKtags', default: 0 })
  cSTKtags: number;

  @Column({ type: 'int', name: 'nHrgQty0', default: 0 })
  nHrgQty0: number;

  @Column({ type: 'decimal', precision: 5, scale: 0, name: 'nHrgQty1', default: 0 })
  nHrgQty1: number;

  @Column({ type: 'decimal', precision: 5, scale: 0, name: 'nHrgQty2', default: 0 })
  nHrgQty2: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nHrgQty01', default: 0.0 })
  nHrgQty01: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nHrgQty02', default: 0.0 })
  nHrgQty02: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nHrgQty03', default: 0.0 })
  nHrgQty03: number;

  @Column({ type: 'int', name: 'cSTKtidak', default: 0 })
  cSTKtidak: number;

  @Column({ type: 'int', name: 'nstkjbawahhrg', default: 0 })
  nstkjbawahhrg: number;

  @Column({ type: 'int', name: 'nstkjbawahhrgpokok', default: 0 })
  nstkjbawahhrgpokok: number;

  @Column({ type: 'varchar', length: 20, name: 'cstk3', default: ' ' })
  cstk3: string;

  @Column({ type: 'varchar', length: 20, name: 'cstk2', default: ' ' })
  cstk2: string;

  @Column({ type: 'varchar', length: 20, name: 'cstk4', default: ' ' })
  cstk4: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nstkhbeli', default: 0.0 })
  nstkhbeli: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nstkxhbeli', default: 0.0 })
  nstkxhbeli: number;

  @Column({ type: 'int', name: 'nstktcukup', default: 0 })
  nstktcukup: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nhrgqty01d', default: 0.0 })
  nhrgqty01d: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nhrgqty02d', default: 0.0 })
  nhrgqty02d: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nhrgqty03d', default: 0.0 })
  nhrgqty03d: number;

  @Column({ type: 'int', name: 'nstkkirim', default: 0 })
  nstkkirim: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nstkpoints', default: 0.0 })
  nstkpoints: number;

  @Column({ type: 'varchar', length: 20, name: 'cstk5', default: ' ' })
  cstk5: string;

  @Column({ type: 'varchar', length: 5, name: 'cstktype', default: 'Hyper' })
  cstktype: string;

  @Column({ type: 'int', name: 'nstkkonsi', default: 0 })
  nstkkonsi: number;

  @Column({ type: 'int', name: 'nstktqty', default: 0 })
  nstktqty: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nstktdiscp', default: 0.0 })
  nstktdiscp: number;

  @Column({ type: 'int', name: 'nstktdk', default: 0 })
  nstktdk: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nstktos', default: 0.0 })
  nstktos: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas01', default: 0.0 })
  nkelas01: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas02', default: 0.0 })
  nkelas02: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas03', default: 0.0 })
  nkelas03: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas04', default: 0.0 })
  nkelas04: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas05', default: 0.0 })
  nkelas05: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas06', default: 0.0 })
  nkelas06: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas07', default: 0.0 })
  nkelas07: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas08', default: 0.0 })
  nkelas08: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas09', default: 0.0 })
  nkelas09: number;

  @Column({ type: 'decimal', precision: 5, scale: 1, name: 'nkelas10', default: 0.0 })
  nkelas10: number;

  @Column({ type: 'int', name: 'nstkmembero', default: 0 })
  nstkmembero: number;

  @Column({ type: 'varchar', length: 23, name: 'cstkfkexp', default: ' ' })
  cstkfkexp: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nstkfee', default: 0.0 })
  nstkfee: number;

  @Column({ type: 'decimal', precision: 12, scale: 4, name: 'nstkukuran', default: 0.0 })
  nstkukuran: number;

  @Column({ type: 'int', name: 'nstkpilih', default: 0 })
  nstkpilih: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nstkhappy', default: 0.0 })
  nstkhappy: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, name: 'nstkpokok', default: 0.0 })
  nstkpokok: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, name: 'nstkxpokok', default: 0.0 })
  nstkxpokok: number;

  @Column({ type: 'date', name: 'dstkpokok', nullable: true })
  dstkpokok: Date | null;

  @Column({ type: 'decimal', precision: 15, scale: 3, name: 'nstkextra', default: 0.0 })
  nstkextra: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, name: 'nstkxextra', default: 0.0 })
  nstkxextra: number;

  @Column({ type: 'int', name: 'nstklipat', default: 0 })
  nstklipat: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'nstkkomisi1', default: 0.0 })
  nstkkomisi1: number;

  @Column({ type: 'int', name: 'nstktdkp', default: 0 })
  nstktdkp: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, name: 'nstkbuy1', default: 0.0 })
  nstkbuy1: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, name: 'nstkxbuy1', default: 0.0 })
  nstkxbuy1: number;

  @Column({ type: 'decimal', precision: 5, scale: 0, name: 'nHrgQty3', default: 0 })
  nHrgQty3: number;

  @Column({ type: 'decimal', precision: 5, scale: 0, name: 'nHrgQty4', default: 0 })
  nHrgQty4: number;

  @Column({ type: 'decimal', precision: 5, scale: 0, name: 'nHrgQty5', default: 0 })
  nHrgQty5: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nHrgQty04', default: 0.0 })
  nHrgQty04: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nHrgQty05', default: 0.0 })
  nHrgQty05: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nHrgQty06', default: 0.0 })
  nHrgQty06: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nhrgqty04d', default: 0.0 })
  nhrgqty04d: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nhrgqty05d', default: 0.0 })
  nhrgqty05d: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'nhrgqty06d', default: 0.0 })
  nhrgqty06d: number;

  @Column({ type: 'varchar', length: 20, name: 'cstk6', default: '' })
  cstk6: string;

  @Column({ type: 'char', length: 20, name: 'cstk7', default: '' })
  cstk7: string;

  @Column({ type: 'int', name: 'nstkqtym', default: 0 })
  nstkqtym: number;

  @Column({ type: 'int', name: 'nstkloncat', default: 0 })
  nstkloncat: number;

  @Column({ type: 'int', name: 'nstkkena', default: 1 })
  nstkkena: number;

  @Column({ type: 'varchar', length: 20, name: 'cstk9', default: '' })
  cstk9: string;

  @Column({ type: 'varchar', length: 20, name: 'cstk8', default: '' })
  cstk8: string;

  @Column({ type: 'int', name: 'nstkcr', default: 0 })
  nstkcr: number;

  @Column({ type: 'varchar', length: 20, name: 'cstk10', default: ' ' })
  cstk10: string;

  @Column({ type: 'varchar', length: 20, name: 'cstkizin', default: '' })
  cstkizin: string;

  @Column({ type: 'varchar', length: 20, name: 'cstkodie', default: ' ' })
  cstkodie: string;

  @Column({ type: 'varchar', length: 20, name: 'cstkmkes', default: ' ' })
  cstkmkes: string;

  @Column({ type: 'int', name: 'nstkkitchen6', default: 0 })
  nstkkitchen6: number;

  @Column({ type: 'int', name: 'nstkkitchen7', default: 0 })
  nstkkitchen7: number;

  @Column({ type: 'int', name: 'nstkkitchen8', default: 0 })
  nstkkitchen8: number;

  @Column({ type: 'int', name: 'nstkkitchen9', default: 0 })
  nstkkitchen9: number;

  @Column({ type: 'int', name: 'nstkkitchen10', default: 0 })
  nstkkitchen10: number;

  @Column({ type: 'varchar', length: 10, name: 'cstkrak2', default: '' })
  cstkrak2: string;

  @Column({ type: 'varchar', length: 10, name: 'cstkrak3', default: '' })
  cstkrak3: string;

  @Column({ type: 'varchar', length: 10, name: 'cstkrak4', default: '' })
  cstkrak4: string;

  @Column({ type: 'int', name: 'nstkpo', default: 0 })
  nstkpo: number;

  @Column({ type: 'int', name: 'nstkppn3', default: 0 })
  nstkppn3: number;

  @Column({ type: 'int', name: 'nstkongkos3', default: 0 })
  nstkongkos3: number;

  @Column({ type: 'int', name: 'nstkmargin3', default: 0 })
  nstkmargin3: number;

  @Column({ type: 'int', name: 'nstkmargin4', default: 0 })
  nstkmargin4: number;

  @Column({ type: 'int', name: 'nstkppn3a', default: 0 })
  nstkppn3a: number;

  @Column({ type: 'int', name: 'nstkongkos3a', default: 0 })
  nstkongkos3a: number;

  @Column({ type: 'int', name: 'nstkmargin3a', default: 0 })
  nstkmargin3a: number;

  @Column({ type: 'int', name: 'nstkmargin4a', default: 0 })
  nstkmargin4a: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nstkberat', default: 0.0 })
  nstkberat: number;

  @Column({ type: 'int', name: 'nstkresep', default: 0 })
  nstkresep: number;

  @Column({ type: 'int', name: 'nstkipoint', default: 0 })
  nstkipoint: number;

  @Column({ type: 'varchar', length: 20, name: 'cstk50', default: '' })
  cstk50: string;

  @Column({ type: 'int', name: 'nstkumkm', default: 0 })
  nstkumkm: number;

  @Column({ type: 'varchar', length: 20, name: 'cstk51', default: '' })
  cstk51: string;

  @Column({ type: 'decimal', precision: 15, scale: 0, name: 'nstklimit', default: 0 })
  nstklimit: number;

  @Column({ type: 'decimal', precision: 5, scale: 0, name: 'nstkpanjang', default: 0 })
  nstkpanjang: number;

  @Column({ type: 'decimal', precision: 5, scale: 0, name: 'nstklebar', default: 0 })
  nstklebar: number;

  @Column({ type: 'decimal', precision: 5, scale: 0, name: 'nstktinggi', default: 0 })
  nstktinggi: number;

  @Column({ type: 'varchar', length: 20, name: 'cstk52', default: '' })
  cstk52: string;

  @Column({ type: 'varchar', length: 20, name: 'cstk53', default: '' })
  cstk53: string;

  @Column({ type: 'varchar', length: 10, name: 'cstk53a', default: '' })
  cstk53a: string;

  @Column({ type: 'varchar', length: 6, name: 'cstkcoretax', default: '000000' })
  cstkcoretax: string;

  @Column({ type: 'int', name: 'cstkcopy1', default: 0 })
  cstkcopy1: number;

  @Column({ type: 'decimal', precision: 10, scale: 0, name: 'nstktqty2', default: 0 })
  nstktqty2: number;

  @Column({ type: 'decimal', precision: 10, scale: 0, name: 'nstktrp', default: 0 })
  nstktrp: number;

  @OneToMany(() => StockDetailTypeOrmEntity, (detail) => detail.stock)
  stockDetails: StockDetailTypeOrmEntity[];

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): Stock {
    const domain = new Stock();
    domain.id = this.cSTKpk;
    domain.description = this.cSTKdesc;
    domain.stockGroupId = this.cSTKfkGRP || null;
    domain.minimumStock = this.nSTKmin;
    domain.maximumStock = this.nSTKmax;
    domain.purchasePrice = this.nSTKbuy;
    domain.costOfGoodsSold = this.nSTKcogs;
    domain.purchasePriceDollar = this.nSTKxbuy;
    domain.costOfGoodsSoldDollar = this.nSTKxcogs;
    domain.entityId = this.cSTKfkENT || null;
    domain.isService = this.nSTKservice === 1;
    domain.brandId = this.cSTKfkBRD || null;
    domain.size = this.cSTKsize || null;
    domain.color = this.cSTKcolor || null;
    domain.isSuspended = this.nSTKsuspend === 1;
    domain.memo = this.cSTKmemo;
    domain.lastDate = this.dSTKlast;
    domain.imagePath = this.cSTKimage || null;
    domain.isOpenPrice = this.nSTKopen === 1;
    domain.taxOption = this.nSTKPPN;
    domain.serialNumber = this.serino;
    domain.rack = this.cSTKrak || null;
    domain.copyToSalesInvoice = this.cSTKcopy === 1;
    domain.markupPercentage1 = this.nSTKMark1;
    domain.markupPercentage2 = this.nSTKMark2;
    domain.markupPercentage3 = this.nSTKMark3;
    domain.markupPercentage4 = this.nSTKMark4;
    domain.markupPercentage5 = this.nSTKMark5;
    domain.markupPercentage6 = this.nSTKMark6;
    domain.standardUnit = this.nSTKbaku;
    domain.miscFlag = this.nSTKmisc;
    domain.snackFlag = this.nSTKsnack;
    domain.foodFlag = this.nSTKfood;
    domain.computerFlag = this.nSTKcomp;
    domain.beverageFlag = this.nSTKbeverage;
    domain.minimumStock1 = this.nstkmin1;
    domain.maximumStock1 = this.nstkmax1;
    domain.giftDate1 = this.dSTKgift1;
    domain.giftDate2 = this.dSTKgift2;
    domain.giftCode = this.cSTKgift || null;
    domain.partNumber1 = this.nSTKpart1 || null;
    domain.partNumber2 = this.nSTKpart2 || null;
    domain.price11 = this.cstk11;
    domain.price12 = this.cstk12;
    domain.price13 = this.cstk13;
    domain.price21 = this.cstk21;
    domain.price22 = this.cstk22;
    domain.price23 = this.cstk23;
    domain.price31 = this.cstk31;
    domain.price32 = this.cstk32;
    domain.price33 = this.cstk33;
    domain.price41 = this.cstk41;
    domain.price42 = this.cstk42;
    domain.price43 = this.cstk43;
    domain.expireDate = this.dstkexpire;
    domain.kitchen1 = this.nSTKkitchen1;
    domain.kitchen2 = this.nSTKkitchen2;
    domain.kitchen3 = this.nSTKkitchen3;
    domain.kitchen4 = this.nSTKkitchen4;
    domain.kitchen5 = this.nSTKkitchen5;
    domain.pieces = this.nSTKpcs;
    domain.roundUp = this.nSTKbulat === 1;
    domain.commission = this.nstkkomisi;
    domain.fastMoving = this.nstkfast === 1;
    domain.selectPriceTags = this.cSTKtags === 1;
    domain.priceByQuantity = this.nHrgQty0 === 1;
    domain.quantity1 = this.nHrgQty1;
    domain.quantity2 = this.nHrgQty2;
    domain.quantity01 = this.nHrgQty01;
    domain.quantity02 = this.nHrgQty02;
    domain.quantity03 = this.nHrgQty03;
    domain.blockIfBelowPurchase = this.cSTKtidak === 1;
    domain.warnIfBelowCost = this.nstkjbawahhrg === 1;
    domain.warnIfBelowPurchasePrice = this.nstkjbawahhrgpokok === 1;
    domain.customField3 = this.cstk3 || null;
    domain.customField2 = this.cstk2 || null;
    domain.customField4 = this.cstk4 || null;
    domain.lastPurchasePrice = this.nstkhbeli;
    domain.lastPurchasePriceDollar = this.nstkxhbeli;
    domain.sufficientStock = this.nstktcukup === 1;
    domain.discountPercentage1 = this.nhrgqty01d;
    domain.discountPercentage2 = this.nhrgqty02d;
    domain.discountPercentage3 = this.nhrgqty03d;
    domain.allowShipping = this.nstkkirim === 1;
    domain.points = this.nstkpoints;
    domain.customField5 = this.cstk5 || null;
    domain.storeType = this.cstktype || null;
    domain.isConsignment = this.nstkkonsi === 1;
    domain.totalQuantity = this.nstktqty;
    domain.discountPercentage = this.nstktdiscp;
    domain.noDiscount = this.nstktdk === 1;
    domain.totalOutOfStock = this.nstktos;
    domain.class01 = this.nkelas01;
    domain.class02 = this.nkelas02;
    domain.class03 = this.nkelas03;
    domain.class04 = this.nkelas04;
    domain.class05 = this.nkelas05;
    domain.class06 = this.nkelas06;
    domain.class07 = this.nkelas07;
    domain.class08 = this.nkelas08;
    domain.class09 = this.nkelas09;
    domain.class10 = this.nkelas10;
    domain.memberOnly = this.nstkmembero === 1;
    domain.expenseCategoryId = this.cstkfkexp || null;
    domain.fee = this.nstkfee;
    domain.dimension = this.nstkukuran;
    domain.selectable = this.nstkpilih === 1;
    domain.happyHourDiscount = this.nstkhappy;
    domain.basePrice = this.nstkpokok;
    domain.basePriceDollar = this.nstkxpokok;
    domain.basePriceDate = this.dstkpokok;
    domain.extraFee = this.nstkextra;
    domain.extraFeeDollar = this.nstkxextra;
    domain.multiply = this.nstklipat === 1;
    domain.commission1 = this.nstkkomisi1;
    domain.noTax = this.nstktdkp === 1;
    domain.purchasePrice1 = this.nstkbuy1;
    domain.purchasePrice1Dollar = this.nstkxbuy1;
    domain.quantity3 = this.nHrgQty3;
    domain.quantity4 = this.nHrgQty4;
    domain.quantity5 = this.nHrgQty5;
    domain.quantity04 = this.nHrgQty04;
    domain.quantity05 = this.nHrgQty05;
    domain.quantity06 = this.nHrgQty06;
    domain.discountPercentage04 = this.nhrgqty04d;
    domain.discountPercentage05 = this.nhrgqty05d;
    domain.discountPercentage06 = this.nhrgqty06d;
    domain.customField6 = this.cstk6 || null;
    domain.customField7 = this.cstk7 || null;
    domain.quantityManual = this.nstkqtym === 1;
    domain.skip = this.nstkloncat === 1;
    domain.enabled = this.nstkkena === 1;
    domain.customField9 = this.cstk9 || null;
    domain.customField8 = this.cstk8 || null;
    domain.credit = this.nstkcr === 1;
    domain.customField10 = this.cstk10 || null;
    domain.permitLicense = this.cstkizin || null;
    domain.customFieldOdie = this.cstkodie || null;
    domain.customFieldMkes = this.cstkmkes || null;
    domain.kitchen6 = this.nstkkitchen6;
    domain.kitchen7 = this.nstkkitchen7;
    domain.kitchen8 = this.nstkkitchen8;
    domain.kitchen9 = this.nstkkitchen9;
    domain.kitchen10 = this.nstkkitchen10;
    domain.rack2 = this.cstkrak2 || null;
    domain.rack3 = this.cstkrak3 || null;
    domain.rack4 = this.cstkrak4 || null;
    domain.purchaseOrder = this.nstkpo === 1;
    domain.taxOption3 = this.nstkppn3;
    domain.cost3 = this.nstkongkos3;
    domain.margin3 = this.nstkmargin3;
    domain.margin4 = this.nstkmargin4;
    domain.taxOption3a = this.nstkppn3a;
    domain.cost3a = this.nstkongkos3a;
    domain.margin3a = this.nstkmargin3a;
    domain.margin4a = this.nstkmargin4a;
    domain.weight = this.nstkberat;
    domain.recipe = this.nstkresep === 1;
    domain.iPoint = this.nstkipoint === 1;
    domain.customField50 = this.cstk50 || null;
    domain.smallBusiness = this.nstkumkm === 1;
    domain.customField51 = this.cstk51 || null;
    domain.limit = this.nstklimit;
    domain.length = this.nstkpanjang;
    domain.width = this.nstklebar;
    domain.height = this.nstktinggi;
    domain.customField52 = this.cstk52 || null;
    domain.customField53 = this.cstk53 || null;
    domain.customField53a = this.cstk53a || null;
    domain.coreTaxCode = this.cstkcoretax || null;
    domain.copyToPurchasing = this.cstkcopy1 === 1;
    domain.totalQuantity2 = this.nstktqty2;
    domain.totalPrice = this.nstktrp;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<Stock>): StockTypeOrmEntity {
    const entity = new StockTypeOrmEntity();
    if (domain.id) entity.cSTKpk = domain.id;
    if (domain.description !== undefined) entity.cSTKdesc = domain.description;
    if (domain.stockGroupId !== undefined) entity.cSTKfkGRP = domain.stockGroupId || '';
    if (domain.minimumStock !== undefined) entity.nSTKmin = domain.minimumStock;
    if (domain.maximumStock !== undefined) entity.nSTKmax = domain.maximumStock;
    if (domain.purchasePrice !== undefined) entity.nSTKbuy = domain.purchasePrice;
    if (domain.costOfGoodsSold !== undefined) entity.nSTKcogs = domain.costOfGoodsSold;
    if (domain.purchasePriceDollar !== undefined) entity.nSTKxbuy = domain.purchasePriceDollar;
    if (domain.costOfGoodsSoldDollar !== undefined) entity.nSTKxcogs = domain.costOfGoodsSoldDollar;
    if (domain.entityId !== undefined) entity.cSTKfkENT = domain.entityId || '';
    if (domain.isService !== undefined) entity.nSTKservice = domain.isService ? 1 : 0;
    if (domain.brandId !== undefined) entity.cSTKfkBRD = domain.brandId || '';
    if (domain.size !== undefined) entity.cSTKsize = domain.size || ' ';
    if (domain.color !== undefined) entity.cSTKcolor = domain.color || ' ';
    if (domain.isSuspended !== undefined) entity.nSTKsuspend = domain.isSuspended ? 1 : 0;
    if (domain.memo !== undefined) entity.cSTKmemo = domain.memo;
    if (domain.lastDate !== undefined) entity.dSTKlast = domain.lastDate;
    if (domain.imagePath !== undefined) entity.cSTKimage = domain.imagePath || ' ';
    if (domain.isOpenPrice !== undefined) entity.nSTKopen = domain.isOpenPrice ? 1 : 0;
    if (domain.taxOption !== undefined) entity.nSTKPPN = domain.taxOption;
    if (domain.serialNumber !== undefined) entity.serino = domain.serialNumber;
    if (domain.rack !== undefined) entity.cSTKrak = domain.rack || ' ';
    if (domain.copyToSalesInvoice !== undefined) entity.cSTKcopy = domain.copyToSalesInvoice ? 1 : 0;
    if (domain.markupPercentage1 !== undefined) entity.nSTKMark1 = domain.markupPercentage1;
    if (domain.markupPercentage2 !== undefined) entity.nSTKMark2 = domain.markupPercentage2;
    if (domain.markupPercentage3 !== undefined) entity.nSTKMark3 = domain.markupPercentage3;
    if (domain.markupPercentage4 !== undefined) entity.nSTKMark4 = domain.markupPercentage4;
    if (domain.markupPercentage5 !== undefined) entity.nSTKMark5 = domain.markupPercentage5;
    if (domain.markupPercentage6 !== undefined) entity.nSTKMark6 = domain.markupPercentage6;
    if (domain.standardUnit !== undefined) entity.nSTKbaku = domain.standardUnit;
    if (domain.miscFlag !== undefined) entity.nSTKmisc = domain.miscFlag;
    if (domain.snackFlag !== undefined) entity.nSTKsnack = domain.snackFlag;
    if (domain.foodFlag !== undefined) entity.nSTKfood = domain.foodFlag;
    if (domain.computerFlag !== undefined) entity.nSTKcomp = domain.computerFlag;
    if (domain.beverageFlag !== undefined) entity.nSTKbeverage = domain.beverageFlag;
    if (domain.minimumStock1 !== undefined) entity.nstkmin1 = domain.minimumStock1;
    if (domain.maximumStock1 !== undefined) entity.nstkmax1 = domain.maximumStock1;
    if (domain.giftDate1 !== undefined) entity.dSTKgift1 = domain.giftDate1;
    if (domain.giftDate2 !== undefined) entity.dSTKgift2 = domain.giftDate2;
    if (domain.giftCode !== undefined) entity.cSTKgift = domain.giftCode || ' ';
    if (domain.partNumber1 !== undefined) entity.nSTKpart1 = domain.partNumber1 || ' ';
    if (domain.partNumber2 !== undefined) entity.nSTKpart2 = domain.partNumber2 || ' ';
    if (domain.price11 !== undefined) entity.cstk11 = domain.price11;
    if (domain.price12 !== undefined) entity.cstk12 = domain.price12;
    if (domain.price13 !== undefined) entity.cstk13 = domain.price13;
    if (domain.price21 !== undefined) entity.cstk21 = domain.price21;
    if (domain.price22 !== undefined) entity.cstk22 = domain.price22;
    if (domain.price23 !== undefined) entity.cstk23 = domain.price23;
    if (domain.price31 !== undefined) entity.cstk31 = domain.price31;
    if (domain.price32 !== undefined) entity.cstk32 = domain.price32;
    if (domain.price33 !== undefined) entity.cstk33 = domain.price33;
    if (domain.price41 !== undefined) entity.cstk41 = domain.price41;
    if (domain.price42 !== undefined) entity.cstk42 = domain.price42;
    if (domain.price43 !== undefined) entity.cstk43 = domain.price43;
    if (domain.expireDate !== undefined) entity.dstkexpire = domain.expireDate;
    if (domain.kitchen1 !== undefined) entity.nSTKkitchen1 = domain.kitchen1;
    if (domain.kitchen2 !== undefined) entity.nSTKkitchen2 = domain.kitchen2;
    if (domain.kitchen3 !== undefined) entity.nSTKkitchen3 = domain.kitchen3;
    if (domain.kitchen4 !== undefined) entity.nSTKkitchen4 = domain.kitchen4;
    if (domain.kitchen5 !== undefined) entity.nSTKkitchen5 = domain.kitchen5;
    if (domain.pieces !== undefined) entity.nSTKpcs = domain.pieces;
    if (domain.roundUp !== undefined) entity.nSTKbulat = domain.roundUp ? 1 : 0;
    if (domain.commission !== undefined) entity.nstkkomisi = domain.commission;
    if (domain.fastMoving !== undefined) entity.nstkfast = domain.fastMoving ? 1 : 0;
    if (domain.selectPriceTags !== undefined) entity.cSTKtags = domain.selectPriceTags ? 1 : 0;
    if (domain.priceByQuantity !== undefined) entity.nHrgQty0 = domain.priceByQuantity ? 1 : 0;
    if (domain.quantity1 !== undefined) entity.nHrgQty1 = domain.quantity1;
    if (domain.quantity2 !== undefined) entity.nHrgQty2 = domain.quantity2;
    if (domain.quantity01 !== undefined) entity.nHrgQty01 = domain.quantity01;
    if (domain.quantity02 !== undefined) entity.nHrgQty02 = domain.quantity02;
    if (domain.quantity03 !== undefined) entity.nHrgQty03 = domain.quantity03;
    if (domain.blockIfBelowPurchase !== undefined) entity.cSTKtidak = domain.blockIfBelowPurchase ? 1 : 0;
    if (domain.warnIfBelowCost !== undefined) entity.nstkjbawahhrg = domain.warnIfBelowCost ? 1 : 0;
    if (domain.warnIfBelowPurchasePrice !== undefined) entity.nstkjbawahhrgpokok = domain.warnIfBelowPurchasePrice ? 1 : 0;
    if (domain.customField3 !== undefined) entity.cstk3 = domain.customField3 || ' ';
    if (domain.customField2 !== undefined) entity.cstk2 = domain.customField2 || ' ';
    if (domain.customField4 !== undefined) entity.cstk4 = domain.customField4 || ' ';
    if (domain.lastPurchasePrice !== undefined) entity.nstkhbeli = domain.lastPurchasePrice;
    if (domain.lastPurchasePriceDollar !== undefined) entity.nstkxhbeli = domain.lastPurchasePriceDollar;
    if (domain.sufficientStock !== undefined) entity.nstktcukup = domain.sufficientStock ? 1 : 0;
    if (domain.discountPercentage1 !== undefined) entity.nhrgqty01d = domain.discountPercentage1;
    if (domain.discountPercentage2 !== undefined) entity.nhrgqty02d = domain.discountPercentage2;
    if (domain.discountPercentage3 !== undefined) entity.nhrgqty03d = domain.discountPercentage3;
    if (domain.allowShipping !== undefined) entity.nstkkirim = domain.allowShipping ? 1 : 0;
    if (domain.points !== undefined) entity.nstkpoints = domain.points;
    if (domain.customField5 !== undefined) entity.cstk5 = domain.customField5 || ' ';
    if (domain.storeType !== undefined) entity.cstktype = domain.storeType || 'Hyper';
    if (domain.isConsignment !== undefined) entity.nstkkonsi = domain.isConsignment ? 1 : 0;
    if (domain.totalQuantity !== undefined) entity.nstktqty = domain.totalQuantity;
    if (domain.discountPercentage !== undefined) entity.nstktdiscp = domain.discountPercentage;
    if (domain.noDiscount !== undefined) entity.nstktdk = domain.noDiscount ? 1 : 0;
    if (domain.totalOutOfStock !== undefined) entity.nstktos = domain.totalOutOfStock;
    if (domain.class01 !== undefined) entity.nkelas01 = domain.class01;
    if (domain.class02 !== undefined) entity.nkelas02 = domain.class02;
    if (domain.class03 !== undefined) entity.nkelas03 = domain.class03;
    if (domain.class04 !== undefined) entity.nkelas04 = domain.class04;
    if (domain.class05 !== undefined) entity.nkelas05 = domain.class05;
    if (domain.class06 !== undefined) entity.nkelas06 = domain.class06;
    if (domain.class07 !== undefined) entity.nkelas07 = domain.class07;
    if (domain.class08 !== undefined) entity.nkelas08 = domain.class08;
    if (domain.class09 !== undefined) entity.nkelas09 = domain.class09;
    if (domain.class10 !== undefined) entity.nkelas10 = domain.class10;
    if (domain.memberOnly !== undefined) entity.nstkmembero = domain.memberOnly ? 1 : 0;
    if (domain.expenseCategoryId !== undefined) entity.cstkfkexp = domain.expenseCategoryId || ' ';
    if (domain.fee !== undefined) entity.nstkfee = domain.fee;
    if (domain.dimension !== undefined) entity.nstkukuran = domain.dimension;
    if (domain.selectable !== undefined) entity.nstkpilih = domain.selectable ? 1 : 0;
    if (domain.happyHourDiscount !== undefined) entity.nstkhappy = domain.happyHourDiscount;
    if (domain.basePrice !== undefined) entity.nstkpokok = domain.basePrice;
    if (domain.basePriceDollar !== undefined) entity.nstkxpokok = domain.basePriceDollar;
    if (domain.basePriceDate !== undefined) entity.dstkpokok = domain.basePriceDate;
    if (domain.extraFee !== undefined) entity.nstkextra = domain.extraFee;
    if (domain.extraFeeDollar !== undefined) entity.nstkxextra = domain.extraFeeDollar;
    if (domain.multiply !== undefined) entity.nstklipat = domain.multiply ? 1 : 0;
    if (domain.commission1 !== undefined) entity.nstkkomisi1 = domain.commission1;
    if (domain.noTax !== undefined) entity.nstktdkp = domain.noTax ? 1 : 0;
    if (domain.purchasePrice1 !== undefined) entity.nstkbuy1 = domain.purchasePrice1;
    if (domain.purchasePrice1Dollar !== undefined) entity.nstkxbuy1 = domain.purchasePrice1Dollar;
    if (domain.quantity3 !== undefined) entity.nHrgQty3 = domain.quantity3;
    if (domain.quantity4 !== undefined) entity.nHrgQty4 = domain.quantity4;
    if (domain.quantity5 !== undefined) entity.nHrgQty5 = domain.quantity5;
    if (domain.quantity04 !== undefined) entity.nHrgQty04 = domain.quantity04;
    if (domain.quantity05 !== undefined) entity.nHrgQty05 = domain.quantity05;
    if (domain.quantity06 !== undefined) entity.nHrgQty06 = domain.quantity06;
    if (domain.discountPercentage04 !== undefined) entity.nhrgqty04d = domain.discountPercentage04;
    if (domain.discountPercentage05 !== undefined) entity.nhrgqty05d = domain.discountPercentage05;
    if (domain.discountPercentage06 !== undefined) entity.nhrgqty06d = domain.discountPercentage06;
    if (domain.customField6 !== undefined) entity.cstk6 = domain.customField6 || '';
    if (domain.customField7 !== undefined) entity.cstk7 = domain.customField7 || '';
    if (domain.quantityManual !== undefined) entity.nstkqtym = domain.quantityManual ? 1 : 0;
    if (domain.skip !== undefined) entity.nstkloncat = domain.skip ? 1 : 0;
    if (domain.enabled !== undefined) entity.nstkkena = domain.enabled ? 1 : 0;
    if (domain.customField9 !== undefined) entity.cstk9 = domain.customField9 || '';
    if (domain.customField8 !== undefined) entity.cstk8 = domain.customField8 || '';
    if (domain.credit !== undefined) entity.nstkcr = domain.credit ? 1 : 0;
    if (domain.customField10 !== undefined) entity.cstk10 = domain.customField10 || ' ';
    if (domain.permitLicense !== undefined) entity.cstkizin = domain.permitLicense || '';
    if (domain.customFieldOdie !== undefined) entity.cstkodie = domain.customFieldOdie || ' ';
    if (domain.customFieldMkes !== undefined) entity.cstkmkes = domain.customFieldMkes || ' ';
    if (domain.kitchen6 !== undefined) entity.nstkkitchen6 = domain.kitchen6;
    if (domain.kitchen7 !== undefined) entity.nstkkitchen7 = domain.kitchen7;
    if (domain.kitchen8 !== undefined) entity.nstkkitchen8 = domain.kitchen8;
    if (domain.kitchen9 !== undefined) entity.nstkkitchen9 = domain.kitchen9;
    if (domain.kitchen10 !== undefined) entity.nstkkitchen10 = domain.kitchen10;
    if (domain.rack2 !== undefined) entity.cstkrak2 = domain.rack2 || '';
    if (domain.rack3 !== undefined) entity.cstkrak3 = domain.rack3 || '';
    if (domain.rack4 !== undefined) entity.cstkrak4 = domain.rack4 || '';
    if (domain.purchaseOrder !== undefined) entity.nstkpo = domain.purchaseOrder ? 1 : 0;
    if (domain.taxOption3 !== undefined) entity.nstkppn3 = domain.taxOption3;
    if (domain.cost3 !== undefined) entity.nstkongkos3 = domain.cost3;
    if (domain.margin3 !== undefined) entity.nstkmargin3 = domain.margin3;
    if (domain.margin4 !== undefined) entity.nstkmargin4 = domain.margin4;
    if (domain.taxOption3a !== undefined) entity.nstkppn3a = domain.taxOption3a;
    if (domain.cost3a !== undefined) entity.nstkongkos3a = domain.cost3a;
    if (domain.margin3a !== undefined) entity.nstkmargin3a = domain.margin3a;
    if (domain.margin4a !== undefined) entity.nstkmargin4a = domain.margin4a;
    if (domain.weight !== undefined) entity.nstkberat = domain.weight;
    if (domain.recipe !== undefined) entity.nstkresep = domain.recipe ? 1 : 0;
    if (domain.iPoint !== undefined) entity.nstkipoint = domain.iPoint ? 1 : 0;
    if (domain.customField50 !== undefined) entity.cstk50 = domain.customField50 || '';
    if (domain.smallBusiness !== undefined) entity.nstkumkm = domain.smallBusiness ? 1 : 0;
    if (domain.customField51 !== undefined) entity.cstk51 = domain.customField51 || '';
    if (domain.limit !== undefined) entity.nstklimit = domain.limit;
    if (domain.length !== undefined) entity.nstkpanjang = domain.length;
    if (domain.width !== undefined) entity.nstklebar = domain.width;
    if (domain.height !== undefined) entity.nstktinggi = domain.height;
    if (domain.customField52 !== undefined) entity.cstk52 = domain.customField52 || '';
    if (domain.customField53 !== undefined) entity.cstk53 = domain.customField53 || '';
    if (domain.customField53a !== undefined) entity.cstk53a = domain.customField53a || '';
    if (domain.coreTaxCode !== undefined) entity.cstkcoretax = domain.coreTaxCode || '000000';
    if (domain.copyToPurchasing !== undefined) entity.cstkcopy1 = domain.copyToPurchasing ? 1 : 0;
    if (domain.totalQuantity2 !== undefined) entity.nstktqty2 = domain.totalQuantity2;
    if (domain.totalPrice !== undefined) entity.nstktrp = domain.totalPrice;
    return entity;
  }
}

