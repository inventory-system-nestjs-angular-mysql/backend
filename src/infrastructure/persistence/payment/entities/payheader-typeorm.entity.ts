import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('payheader')
export class PayheaderTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cPHYPk' })
  cPHYPk: string;

  @Column({ type: 'varchar', length: 20, name: 'cPHYrefno', nullable: true })
  cPHYrefno: string | null;

  @Column({ type: 'char', length: 23, name: 'cPHYfkExc', nullable: true })
  cPHYfkExc: string | null;

  @Column({ type: 'date', name: 'dPHYDate', nullable: true })
  dPHYDate: Date | null;

  @Column({ type: 'varchar', length: 40, name: 'cPHYremark', nullable: true })
  cPHYremark: string | null;

  @Column({ type: 'char', length: 23, name: 'cPHYfkEnt', nullable: true })
  cPHYfkEnt: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nPHYcash', default: 0 })
  nPHYcash: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nPHYtransfer', default: 0 })
  nPHYtransfer: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nPHYccard', default: 0 })
  nPHYccard: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nPHYdcard', default: 0 })
  nPHYdcard: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nPHYvoucher', default: 0 })
  nPHYvoucher: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nPHYcheque', default: 0 })
  nPHYcheque: number;

  @Column({ type: 'varchar', length: 23, name: 'cPHYbank1', nullable: true })
  cPHYbank1: string | null;

  @Column({ type: 'varchar', length: 30, name: 'cPHYcekno', nullable: true })
  cPHYcekno: string | null;

  @Column({ type: 'date', name: 'cPHYcektgl', nullable: true })
  cPHYcektgl: Date | null;

  @Column({ type: 'char', length: 2, name: 'cPHYCode', nullable: true })
  cPHYCode: string | null;

  @Column({ type: 'char', length: 20, name: 'cPHyfkEntCode', nullable: true })
  cPHyfkEntCode: string | null;

  @Column({ type: 'varchar', length: 2, name: 'cPHYtipe', nullable: true })
  cPHYtipe: string | null;

  @Column({ type: 'int', name: 'nPHYcair', default: 1 })
  nPHYcair: number;

  @Column({ type: 'varchar', length: 23, name: 'cphyfkwhs', nullable: true })
  cphyfkwhs: string | null;
}
