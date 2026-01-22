import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { Salesman } from '../../../../core/salesman/entities/salesman.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('salesman')
@Index('serino', ['serino'])
export class SalesmanTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cSAMpk' })
  cSAMpk: string;

  @Column({ type: 'varchar', length: 40, name: 'cSAMdesc' })
  cSAMdesc: string;

  @Column({ type: 'varchar', length: 40, name: 'cSAMadd1', nullable: true })
  cSAMadd1: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cSAMadd2', nullable: true })
  cSAMadd2: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cSAMadd3', nullable: true })
  cSAMadd3: string | null;

  @Column({ type: 'date', name: 'dSAMlast', nullable: true })
  dSAMlast: Date | null;

  @Column({ type: 'text', name: 'cSAMmemo', nullable: true })
  cSAMmemo: string | null;

  @Column({ type: 'int', name: 'nSAMsuspend', nullable: true })
  nSAMsuspend: number | null;

  @Column({ type: 'varchar', length: 2, name: 'cSAMspecial', nullable: true })
  cSAMspecial: string | null;

  @Column({ type: 'varchar', length: 45, name: 'cSAMimage', nullable: true })
  cSAMimage: string | null;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    name: 'nSAMkomisi',
    nullable: true,
  })
  nSAMkomisi: number | null;

  @Column({ type: 'varchar', length: 20, name: 'csam3', nullable: true })
  csam3: string | null;

  @Column({ type: 'varchar', length: 20, name: 'csam2', nullable: true })
  csam2: string | null;

  @Column({ type: 'varchar', length: 20, name: 'csam4', nullable: true })
  csam4: string | null;

  @Column({ type: 'varchar', length: 20, name: 'csam5', nullable: true })
  csam5: string | null;

  @Column({ type: 'varchar', length: 6, name: 'csamtype', nullable: true })
  csamtype: string | null;

  @Column({ type: 'varchar', length: 20, name: 'csam6', nullable: true })
  csam6: string | null;

  @Column({ type: 'varchar', length: 20, name: 'csam9', default: '' })
  csam9: string;

  @Column({ type: 'varchar', length: 20, name: 'csam10', default: ' ' })
  csam10: string;

  @Column({ type: 'varchar', length: 20, name: 'csam50', default: '' })
  csam50: string;

  @Column({ type: 'varchar', length: 20, name: 'csam51', default: '' })
  csam51: string;

  @Column({ type: 'varchar', length: 20, name: 'csam52', default: '' })
  csam52: string;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): Salesman {
    const domain = new Salesman();
    domain.id = this.cSAMpk;
    domain.description = this.cSAMdesc;
    domain.address1 = this.cSAMadd1;
    domain.address2 = this.cSAMadd2;
    domain.address3 = this.cSAMadd3;
    domain.lastDate = this.dSAMlast;
    domain.memo = this.cSAMmemo;
    domain.isSuspended = this.nSAMsuspend === 1;
    domain.special = this.cSAMspecial;
    domain.imagePath = this.cSAMimage;
    domain.serialNumber = this.serino;
    domain.commission = this.nSAMkomisi;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<Salesman>): SalesmanTypeOrmEntity {
    const entity = new SalesmanTypeOrmEntity();
    if (domain.id) entity.cSAMpk = domain.id;
    if (domain.description !== undefined) entity.cSAMdesc = domain.description;
    if (domain.address1 !== undefined) entity.cSAMadd1 = domain.address1;
    if (domain.address2 !== undefined) entity.cSAMadd2 = domain.address2;
    if (domain.address3 !== undefined) entity.cSAMadd3 = domain.address3;
    if (domain.lastDate !== undefined) entity.dSAMlast = domain.lastDate;
    if (domain.memo !== undefined) entity.cSAMmemo = domain.memo;
    if (domain.isSuspended !== undefined) entity.nSAMsuspend = domain.isSuspended ? 1 : 0;
    if (domain.special !== undefined) entity.cSAMspecial = domain.special;
    if (domain.imagePath !== undefined) entity.cSAMimage = domain.imagePath;
    if (domain.serialNumber !== undefined) entity.serino = domain.serialNumber;
    if (domain.commission !== undefined) entity.nSAMkomisi = domain.commission;
    return entity;
  }
}

