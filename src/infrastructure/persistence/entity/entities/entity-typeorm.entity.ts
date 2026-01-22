import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CityTypeOrmEntity } from '../../city/entities/city-typeorm.entity';

/**
 * Infrastructure Layer - TypeORM Entity
 * Maps database schema to domain entity
 * Shared entity for both Supplier (nENTsupp=1) and Customer (nENTcust=1)
 */
@Entity('entity')
@Index('cENTcode', ['cENTcode'], { unique: true })
@Index('cENTdesc', ['cENTdesc'])
@Index('cENTfkCIT', ['cENTfkCIT'])
@Index('nENTsupp', ['nENTsupp'])
@Index('nENTcust', ['nENTcust'])
@Index('nENTsuspend', ['nENTsuspend'])
export class EntityTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cENTpk' })
  cENTpk: string;

  @Column({ type: 'char', length: 20, name: 'cENTcode', default: 'id' })
  cENTcode: string;

  @Column({ type: 'varchar', length: 40, name: 'cENTdesc' })
  cENTdesc: string;

  @Column({ type: 'char', length: 23, name: 'cENTfkCIT', default: '' })
  cENTfkCIT: string;

  @ManyToOne(() => CityTypeOrmEntity, { nullable: true, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'cENTfkCIT', referencedColumnName: 'cCITpk' })
  city: CityTypeOrmEntity | null;

  @Column({ type: 'varchar', length: 40, name: 'cENTadd1', nullable: true })
  cENTadd1: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cENTadd2', nullable: true })
  cENTadd2: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cENTadd3', nullable: true })
  cENTadd3: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cENTadd4', nullable: true })
  cENTadd4: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cENTadd5', nullable: true })
  cENTadd5: string | null;

  @Column({ type: 'varchar', length: 16, name: 'cENTnpwp', default: '' })
  cENTnpwp: string;

  @Column({ type: 'varchar', length: 16, name: 'cENTnppkp', default: '' })
  cENTnppkp: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'nENTlimit',
    default: 0.0,
  })
  nENTlimit: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    name: 'nENTdisc',
    default: 0.0,
  })
  nENTdisc: number;

  @Column({ type: 'int', name: 'nENTterm', default: 0 })
  nENTterm: number;

  @Column({ type: 'int', name: 'nENTsame', default: 1 })
  nENTsame: number;

  @Column({ type: 'varchar', length: 40, name: 'cENTbill', nullable: true })
  cENTbill: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cENTbadd1', nullable: true })
  cENTbadd1: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cENTbadd2', nullable: true })
  cENTbadd2: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cENTbadd3', nullable: true })
  cENTbadd3: string | null;

  @Column({ type: 'varchar', length: 40, name: 'cENTbadd4', nullable: true })
  cENTbadd4: string | null;

  @Column({ type: 'date', name: 'dENTcreate', nullable: true })
  dENTcreate: Date | null;

  @Column({ type: 'date', name: 'dENTlast', nullable: true })
  dENTlast: Date | null;

  @Column({ type: 'int', name: 'nENTsuspend', default: 0 })
  nENTsuspend: number;

  @Column({ type: 'text', name: 'cENTmemo', nullable: true })
  cENTmemo: string | null;

  @Column({ type: 'int', name: 'nENTsupp', default: 0 })
  nENTsupp: number;

  @Column({ type: 'int', name: 'nENTcust', default: 0 })
  nENTcust: number;

  @Column({ type: 'varchar', length: 45, name: 'cENTimage', nullable: true })
  cENTimage: string | null;

  @Column({ type: 'varchar', length: 10, name: 'serino', nullable: true })
  serino: string | null;

  @Column({ type: 'int', name: 'nENTvisit', nullable: true })
  nENTvisit: number | null;

  @Column({ type: 'varchar', length: 40, name: 'centemail', default: '' })
  centemail: string;

  @Column({ type: 'varchar', length: 40, name: 'centemail2', default: '' })
  centemail2: string;

  @Column({ type: 'varchar', length: 40, name: 'centemail3', default: '' })
  centemail3: string;

  // Customer-specific fields
  @Column({ type: 'varchar', length: 20, name: 'cent52', default: '' })
  cent52: string; // Zip

  @Column({ type: 'varchar', length: 20, name: 'cent50', default: '' })
  cent50: string; // Telephone

  @Column({ type: 'date', name: 'dentcdob', nullable: true })
  dentcdob: Date | null; // Birthday

  @Column({ type: 'varchar', length: 10, name: 'centagama', nullable: true })
  centagama: string | null; // Religion

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'nentjatah',
    default: 0.0,
  })
  nentjatah: number; // Outstanding Limit

  @Column({ type: 'int', name: 'nENTjarak', default: 0 })
  nENTjarak: number; // Distance

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'ongkos',
    nullable: true,
  })
  ongkos: number | null; // Freight

  @Column({ type: 'int', name: 'nenttipe', nullable: true })
  nenttipe: number | null; // Price Type: 1=ISX, 2=POSX, 3=All

  @Column({ type: 'varchar', length: 23, name: 'cENTfkSAL', nullable: true })
  cENTfkSAL: string | null; // Salesman

  @Column({ type: 'int', name: 'nentgender', nullable: true })
  nentgender: number | null; // Gender: 0=Male, 1=Female

  @Column({ type: 'varchar', length: 20, name: 'cent51', default: '' })
  cent51: string; // NIK
}

