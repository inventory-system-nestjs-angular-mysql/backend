import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('paydetail')
export class PaydetailTypeOrmEntity {
  @PrimaryColumn({ type: 'char', length: 23, name: 'cPYDpk' })
  cPYDpk: string;

  @Column({ type: 'char', length: 10, name: 'cPYDtype', nullable: true })
  cPYDtype: string | null;

  @Column({ type: 'char', length: 23, name: 'cPydFkInv', nullable: true })
  cPydFkInv: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nPYDamount', default: 0 })
  nPYDamount: number;

  @Column({ type: 'char', length: 23, name: 'cPydFkPhy', nullable: true })
  cPydFkPhy: string | null;

  @Column({ type: 'int', name: 'nPydOrder', default: 0 })
  nPydOrder: number;

  @Column({ type: 'date', name: 'dPydDate', nullable: true })
  dPydDate: Date | null;

  @Column({ type: 'date', name: 'dPydtgl', nullable: true })
  dPydtgl: Date | null;

  @Column({ type: 'date', name: 'dPydjatuh', nullable: true })
  dPydjatuh: Date | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nPydnilai', default: 0 })
  nPydnilai: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'nPydsisa', default: 0 })
  nPydsisa: number;

  @Column({ type: 'int', name: 'nPydcheck', default: 0 })
  nPydcheck: number;

  @Column({ type: 'varchar', length: 20, name: 'cPydrefno', nullable: true })
  cPydrefno: string | null;
}
