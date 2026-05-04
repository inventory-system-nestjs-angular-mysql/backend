import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ymk')
export class YmkTypeOrmEntity {
  @PrimaryColumn({ type: 'varchar', length: 40, name: 'company1' })
  company1: string;

  @Column({ type: 'varchar', length: 20, name: 'l_beli', nullable: true })
  l_beli: string | null;

  @Column({ type: 'varchar', length: 20, name: 'l_rbeli', nullable: true })
  l_rbeli: string | null;

  @Column({ type: 'varchar', length: 20, name: 'l_sbayar', nullable: true })
  l_sbayar: string | null;

  @Column({ type: 'varchar', length: 20, name: 'l_cbayar', nullable: true })
  l_cbayar: string | null;

  @Column({ type: 'varchar', length: 20, name: 'l_pindah', nullable: true })
  l_pindah: string | null;
}
