import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { Warehouse } from '../../../../core/warehouse/entities/warehouse.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('warehouse')
@Index('cWHSdesc', ['cWHSdesc'], { unique: true })
@Index('serino', ['serino'])
export class WarehouseTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cWHSpk' })
  cWHSpk: string;

  @Column({ type: 'varchar', length: 40, name: 'cWHSdesc', default: '' })
  cWHSdesc: string;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cWHSrefno', default: '' })
  cWHSrefno: string | null;

  @Column({ type: 'varchar', length: 10, name: 'kepalaseri', default: '' })
  kepalaseri: string | null;

  @Column({ type: 'int', name: 'nwhsoption', default: 0 })
  nwhsoption: number | null;

  @Column({ type: 'int', name: 'nwhscr', default: 0 })
  nwhscr: number | null;

  @Column({ type: 'varchar', length: 10, name: 'ckepalaseri1', default: '' })
  ckepalaseri1: string | null;

  @Column({ type: 'varchar', length: 10, name: 'ckepalaseri2', default: '' })
  ckepalaseri2: string | null;

  @Column({ type: 'varchar', length: 10, name: 'ckepalaseri3', default: '' })
  ckepalaseri3: string | null;

  @Column({ type: 'varchar', length: 10, name: 'ckepalaseri4', default: '' })
  ckepalaseri4: string | null;

  @Column({ type: 'varchar', length: 10, name: 'ckepalaseri5', default: '' })
  ckepalaseri5: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cwhsrefno1', default: '' })
  cwhsrefno1: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cwhsrefno2', default: '' })
  cwhsrefno2: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cwhsrefno3', default: '' })
  cwhsrefno3: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cwhsrefno4', default: '' })
  cwhsrefno4: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cwhsrefno5', default: '' })
  cwhsrefno5: string | null;

  @Column({ type: 'varchar', length: 23, name: 'cwhslok1', default: '' })
  cwhslok1: string | null;

  @Column({ type: 'varchar', length: 23, name: 'cwhslok2', default: '' })
  cwhslok2: string | null;

  @Column({ type: 'varchar', length: 23, name: 'cwhslok3', default: '' })
  cwhslok3: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nwhsmin', default: 0.0 })
  nwhsmin: number | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nwhsmax', default: 0.0 })
  nwhsmax: number | null;

  @Column({ type: 'int', name: 'nwhslipat', default: 0 })
  nwhslipat: number | null;

  @Column({ type: 'varchar', length: 10, name: 'ckepalaseri1b', default: '' })
  ckepalaseri1b: string | null;

  @Column({ type: 'varchar', length: 10, name: 'ckepalaseri1c', default: '' })
  ckepalaseri1c: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cwhsrefno1b', default: '' })
  cwhsrefno1b: string | null;

  @Column({ type: 'varchar', length: 20, name: 'cwhsrefno1c', default: '' })
  cwhsrefno1c: string | null;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): Warehouse {
    const domain = new Warehouse();
    domain.id = this.cWHSpk;
    domain.description = this.cWHSdesc;
    domain.serialNumber = this.serino;
    domain.refNo = this.cWHSrefno;
    domain.kepalaSeri = this.kepalaseri;
    domain.option = this.nwhsoption;
    domain.cr = this.nwhscr;
    domain.kepalaSeri1 = this.ckepalaseri1;
    domain.kepalaSeri2 = this.ckepalaseri2;
    domain.kepalaSeri3 = this.ckepalaseri3;
    domain.kepalaSeri4 = this.ckepalaseri4;
    domain.kepalaSeri5 = this.ckepalaseri5;
    domain.refNo1 = this.cwhsrefno1;
    domain.refNo2 = this.cwhsrefno2;
    domain.refNo3 = this.cwhsrefno3;
    domain.refNo4 = this.cwhsrefno4;
    domain.refNo5 = this.cwhsrefno5;
    domain.lok1 = this.cwhslok1;
    domain.lok2 = this.cwhslok2;
    domain.lok3 = this.cwhslok3;
    domain.min = this.nwhsmin;
    domain.max = this.nwhsmax;
    domain.slipat = this.nwhslipat;
    domain.kepalaSeri1b = this.ckepalaseri1b;
    domain.kepalaSeri1c = this.ckepalaseri1c;
    domain.refNo1b = this.cwhsrefno1b;
    domain.refNo1c = this.cwhsrefno1c;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<Warehouse>): WarehouseTypeOrmEntity {
    const entity = new WarehouseTypeOrmEntity();
    entity.cWHSpk = domain.id!;
    entity.cWHSdesc = domain.description!;
    entity.serino = domain.serialNumber ?? null;
    entity.cWHSrefno = domain.refNo ?? null;
    entity.kepalaseri = domain.kepalaSeri ?? null;
    entity.nwhsoption = domain.option ?? null;
    entity.nwhscr = domain.cr ?? null;
    entity.ckepalaseri1 = domain.kepalaSeri1 ?? null;
    entity.ckepalaseri2 = domain.kepalaSeri2 ?? null;
    entity.ckepalaseri3 = domain.kepalaSeri3 ?? null;
    entity.ckepalaseri4 = domain.kepalaSeri4 ?? null;
    entity.ckepalaseri5 = domain.kepalaSeri5 ?? null;
    entity.cwhsrefno1 = domain.refNo1 ?? null;
    entity.cwhsrefno2 = domain.refNo2 ?? null;
    entity.cwhsrefno3 = domain.refNo3 ?? null;
    entity.cwhsrefno4 = domain.refNo4 ?? null;
    entity.cwhsrefno5 = domain.refNo5 ?? null;
    entity.cwhslok1 = domain.lok1 ?? null;
    entity.cwhslok2 = domain.lok2 ?? null;
    entity.cwhslok3 = domain.lok3 ?? null;
    entity.nwhsmin = domain.min ?? null;
    entity.nwhsmax = domain.max ?? null;
    entity.nwhslipat = domain.slipat ?? null;
    entity.ckepalaseri1b = domain.kepalaSeri1b ?? null;
    entity.ckepalaseri1c = domain.kepalaSeri1c ?? null;
    entity.cwhsrefno1b = domain.refNo1b ?? null;
    entity.cwhsrefno1c = domain.refNo1c ?? null;
    return entity;
  }
}

