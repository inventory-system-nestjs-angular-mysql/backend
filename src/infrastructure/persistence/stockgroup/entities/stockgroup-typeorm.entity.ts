import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { StockGroup } from '../../../../core/stockgroup/entities/stockgroup.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('stockgroup')
@Index('cGRPdesc', ['cGRPdesc'], { unique: true })
@Index('serino', ['serino'])
export class StockGroupTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cGRPpk' })
  cGRPpk: string;

  @Column({ type: 'varchar', length: 40, name: 'cGRPdesc', comment: 'ID' })
  cGRPdesc: string;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'markrp1',
    nullable: true,
  })
  markrp1: number | null;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    name: 'markpersen1',
    nullable: true,
  })
  markpersen1: number | null;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'markrp2',
    nullable: true,
  })
  markrp2: number | null;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    name: 'markpersen2',
    nullable: true,
  })
  markpersen2: number | null;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 0,
    name: 'ngrpnilai',
    nullable: true,
  })
  ngrpnilai: number | null;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 0,
    name: 'ngrpdollar',
    nullable: true,
  })
  ngrpdollar: number | null;

  @Column({ type: 'char', length: 4, name: 'cgrpkep', nullable: true })
  cgrpkep: string | null;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    name: 'ngrpqty',
    default: 0,
  })
  ngrpqty: number;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): StockGroup {
    const domain = new StockGroup();
    domain.id = this.cGRPpk;
    domain.description = this.cGRPdesc;
    domain.serialNumber = this.serino;
    domain.markupAmount1 = this.markrp1;
    domain.markupPercentage1 = this.markpersen1;
    domain.markupAmount2 = this.markrp2;
    domain.markupPercentage2 = this.markpersen2;
    domain.groupValue = this.ngrpnilai;
    domain.groupValueDollar = this.ngrpdollar;
    domain.groupCode = this.cgrpkep;
    domain.quantity = this.ngrpqty;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<StockGroup>): StockGroupTypeOrmEntity {
    const entity = new StockGroupTypeOrmEntity();
    entity.cGRPpk = domain.id!;
    entity.cGRPdesc = domain.description!;
    entity.serino = domain.serialNumber ?? null;
    entity.markrp1 = domain.markupAmount1 ?? null;
    entity.markpersen1 = domain.markupPercentage1 ?? null;
    entity.markrp2 = domain.markupAmount2 ?? null;
    entity.markpersen2 = domain.markupPercentage2 ?? null;
    entity.ngrpnilai = domain.groupValue ?? null;
    entity.ngrpdollar = domain.groupValueDollar ?? null;
    entity.cgrpkep = domain.groupCode ?? null;
    entity.ngrpqty = domain.quantity ?? 0;
    return entity;
  }
}

