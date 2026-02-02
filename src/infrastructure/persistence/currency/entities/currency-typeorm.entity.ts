import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { Currency } from '../../../../core/currency/entities/currency.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('exchange')
@Index('cEXCdesc', ['cEXCdesc'], { unique: true })
@Index('nEXCvalue', ['nEXCvalue'])
@Index('serino', ['serino'])
export class CurrencyTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cEXCpk' })
  cEXCpk: string;

  @Column({ type: 'varchar', length: 10, name: 'cEXCdesc', comment: 'ID' })
  cEXCdesc: string;

  @Column({ type: 'decimal', precision: 15, scale: 4, name: 'nEXCvalue', default: 0.0 })
  nEXCvalue: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, name: 'nEXCtaxvalue', default: 0.0 })
  nEXCtaxvalue: number;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): Currency {
    const domain = new Currency();
    domain.id = this.cEXCpk;
    domain.currency = this.cEXCdesc;
    domain.rate = Number(this.nEXCvalue);
    domain.taxRate = Number(this.nEXCtaxvalue);
    domain.serialNumber = this.serino;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<Currency>): CurrencyTypeOrmEntity {
    const entity = new CurrencyTypeOrmEntity();
    if (domain.id) entity.cEXCpk = domain.id;
    if (domain.currency !== undefined) entity.cEXCdesc = domain.currency;
    if (domain.rate !== undefined) entity.nEXCvalue = domain.rate;
    if (domain.taxRate !== undefined) entity.nEXCtaxvalue = domain.taxRate;
    if (domain.serialNumber !== undefined) entity.serino = domain.serialNumber;
    return entity;
  }
}

