import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { Brand } from '../../../../core/brand/entities/brand.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('brand')
@Index('serino', ['serino'])
export class BrandTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cBRDpk' })
  cBRDpk: string;

  @Column({ type: 'varchar', length: 40, name: 'cBRDdesc', comment: 'ID' })
  cBRDdesc: string;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): Brand {
    const domain = new Brand();
    domain.id = this.cBRDpk;
    domain.description = this.cBRDdesc;
    domain.serialNumber = this.serino;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<Brand>): BrandTypeOrmEntity {
    const entity = new BrandTypeOrmEntity();
    entity.cBRDpk = domain.id!;
    entity.cBRDdesc = domain.description!;
    entity.serino = domain.serialNumber ?? null;
    return entity;
  }
}

