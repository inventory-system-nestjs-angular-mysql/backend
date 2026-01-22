import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { Bank } from '../../../../core/bank/entities/bank.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('bank')
@Index('cBANdesc', ['cBANdesc'], { unique: true })
@Index('serino', ['serino'])
export class BankTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cBANpk' })
  cBANpk: string;

  @Column({ type: 'varchar', length: 40, name: 'cBANdesc', comment: 'ID' })
  cBANdesc: string;

  @Column({ type: 'char', length: 23, name: 'cBANgl', nullable: true })
  cBANgl: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cBANacc', nullable: true })
  cBANacc: string | null;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): Bank {
    const domain = new Bank();
    domain.id = this.cBANpk;
    domain.description = this.cBANdesc;
    domain.gl = this.cBANgl;
    domain.account = this.cBANacc;
    domain.serialNumber = this.serino;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<Bank>): BankTypeOrmEntity {
    const entity = new BankTypeOrmEntity();
    entity.cBANpk = domain.id!;
    entity.cBANdesc = domain.description!;
    entity.cBANgl = domain.gl ?? null;
    entity.cBANacc = domain.account ?? null;
    entity.serino = domain.serialNumber ?? null;
    return entity;
  }
}

