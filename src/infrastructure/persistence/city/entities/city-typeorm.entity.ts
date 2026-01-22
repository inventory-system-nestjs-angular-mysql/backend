import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { City } from '../../../../core/city/entities/city.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 */
@Entity('city')
@Index('cCITdesc', ['cCITdesc'], { unique: true })
@Index('serino', ['serino'])
export class CityTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cCITpk' })
  cCITpk: string;

  @Column({ type: 'varchar', length: 40, name: 'cCITdesc', comment: 'ID' })
  cCITdesc: string;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  /**
   * Maps TypeORM entity to domain entity
   */
  toDomain(): City {
    const domain = new City();
    domain.id = this.cCITpk;
    domain.description = this.cCITdesc;
    domain.serialNumber = this.serino;
    return domain;
  }

  /**
   * Creates TypeORM entity from domain entity
   */
  static fromDomain(domain: Partial<City>): CityTypeOrmEntity {
    const entity = new CityTypeOrmEntity();
    entity.cCITpk = domain.id!;
    entity.cCITdesc = domain.description!;
    entity.serino = domain.serialNumber ?? null;
    return entity;
  }
}

