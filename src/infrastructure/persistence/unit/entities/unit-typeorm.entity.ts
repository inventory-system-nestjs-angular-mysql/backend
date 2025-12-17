import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { Unit } from '../../../../core/unit/entities/unit.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('unit')
@Index('cUNIdesc', ['cUNIdesc'], { unique: true })
@Index('serino', ['serino'])
export class UnitTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cUNIpk' })
  cUNIpk: string;

  @Column({ type: 'varchar', length: 40, name: 'cUNIdesc', comment: 'ID' })
  cUNIdesc: string;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  @Column({
    type: 'varchar',
    length: 7,
    name: 'cunicoretax',
    nullable: true,
    default: '',
  })
  cunicoretax: string | null;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): Unit {
    const domain = new Unit();
    domain.id = this.cUNIpk;
    domain.description = this.cUNIdesc;
    domain.serialNumber = this.serino;
    domain.coreTax = this.cunicoretax;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<Unit>): UnitTypeOrmEntity {
    const entity = new UnitTypeOrmEntity();
    entity.cUNIpk = domain.id!;
    entity.cUNIdesc = domain.description!;
    entity.serino = domain.serialNumber ?? null;
    entity.cunicoretax = domain.coreTax ?? null;
    return entity;
  }
}

