import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceTypeOrmEntity } from '../../invoice/entities/invoice-typeorm.entity';
import { InvoiceDetailTypeOrmEntity } from '../../invoice/entities/invoice-detail-typeorm.entity';
import { Invoice } from '../../../../core/invoice/entities/invoice.entity';
import { InvoiceDetail } from '../../../../core/invoice/entities/invoice-detail.entity';
import { IGoodsTransferRepository } from '../../../../core/goods-transfer/repositories/goods-transfer.repository.interface';

const SPECIAL = 'PD';

@Injectable()
export class GoodsTransferRepository implements IGoodsTransferRepository {
  constructor(
    @InjectRepository(InvoiceTypeOrmEntity)
    private readonly invoiceRepo: Repository<InvoiceTypeOrmEntity>,
    @InjectRepository(InvoiceDetailTypeOrmEntity)
    private readonly detailRepo: Repository<InvoiceDetailTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    const entities = await this.invoiceRepo.find({
      where: { cINVspecial: SPECIAL },
      order: { dINVdate: 'DESC' },
    });
    return entities.map((e) => e.toDomain());
  }

  async findOne(id: string): Promise<Invoice | null> {
    const entity = await this.invoiceRepo.findOne({
      where: { cINVpk: id, cINVspecial: SPECIAL },
    });
    return entity ? entity.toDomain() : null;
  }

  async findDetailsByInvoiceId(invoiceId: string): Promise<InvoiceDetail[]> {
    const entities = await this.detailRepo.find({
      where: { cIVDfkINV: invoiceId },
      order: { nIVDorder: 'ASC' },
    });
    return entities.map((e) => e.toDomain());
  }

  async create(data: Partial<Invoice>): Promise<Invoice> {
    const entity = InvoiceTypeOrmEntity.fromDomain(data);
    const saved = await this.invoiceRepo.save(entity);
    return saved.toDomain();
  }

  async createDetail(data: Partial<InvoiceDetail>): Promise<InvoiceDetail> {
    const entity = InvoiceDetailTypeOrmEntity.fromDomain(data);
    const saved = await this.detailRepo.save(entity);
    return saved.toDomain();
  }

  async detailExists(id: string): Promise<boolean> {
    return this.detailRepo.exists({ where: { cIVDpk: id } });
  }

  async update(id: string, data: Partial<Invoice>): Promise<void> {
    const entity = InvoiceTypeOrmEntity.fromDomain(data);
    const updateFields: Partial<InvoiceTypeOrmEntity> = {};
    Object.keys(entity).forEach((key) => {
      if (entity[key] !== undefined && entity[key] !== null && key !== 'cINVpk') {
        updateFields[key] = entity[key];
      }
    });
    await this.invoiceRepo.update({ cINVpk: id }, updateFields);
  }

  async deleteDetailsByInvoiceId(invoiceId: string): Promise<void> {
    await this.detailRepo.delete({ cIVDfkINV: invoiceId });
  }

  async delete(id: string): Promise<void> {
    await this.invoiceRepo.delete({ cINVpk: id });
  }

  async exists(id: string): Promise<boolean> {
    return this.invoiceRepo.exists({ where: { cINVpk: id } });
  }

  async sumAmountsByInvoiceIds(invoiceIds: string[]): Promise<Map<string, number>> {
    const map = new Map<string, number>();
    if (!invoiceIds.length) return map;
    const rows = await this.detailRepo
      .createQueryBuilder('d')
      .innerJoin('invoice', 'i', 'i.cINVpk = d.cIVDfkINV')
      .innerJoin(
        (qb) =>
          qb
            .select('cIVDfkINV', 'invId')
            .addSelect('COUNT(*)', 'rowCount')
            .from('invoicedetail', 'dc')
            .where('dc.cIVDfkINV IN (:...ids)', { ids: invoiceIds })
            .groupBy('dc.cIVDfkINV'),
        'cnt',
        'cnt.invId = d.cIVDfkINV',
      )
      .select('d.cIVDfkINV', 'invoiceId')
      .addSelect(
        `SUM(
          ((d.nIVDAmount * (1 - i.nInvDisc1/100) * (1 - i.nInvDisc2/100) * (1 - i.nInvDisc3/100))
          - (i.nINVdisc / cnt.rowCount))
          * IF(d.nIVDstkppn = 1, 1 + i.nINVtax/100, 1)
        ) + MAX(i.nINVfreight)`,
        'total',
      )
      .where('d.cIVDfkINV IN (:...ids)', { ids: invoiceIds })
      .groupBy('d.cIVDfkINV')
      .getRawMany();
    rows.forEach((r) => map.set(r.invoiceId, Number(r.total ?? 0)));
    return map;
  }
}
