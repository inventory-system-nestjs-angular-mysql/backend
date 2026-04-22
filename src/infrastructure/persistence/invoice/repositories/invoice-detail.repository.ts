import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInvoiceDetailRepository } from '../../../../core/invoice/repositories/invoice-detail.repository.interface';
import { InvoiceDetail } from '../../../../core/invoice/entities/invoice-detail.entity';
import { InvoiceDetailTypeOrmEntity } from '../entities/invoice-detail-typeorm.entity';

@Injectable()
export class InvoiceDetailRepository implements IInvoiceDetailRepository {
  constructor(
    @InjectRepository(InvoiceDetailTypeOrmEntity)
    private readonly repository: Repository<InvoiceDetailTypeOrmEntity>,
  ) {}

  async create(detail: Partial<InvoiceDetail>): Promise<InvoiceDetail> {
    const entity = InvoiceDetailTypeOrmEntity.fromDomain(detail);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async findByInvoiceId(invoiceId: string): Promise<InvoiceDetail[]> {
    const entities = await this.repository.find({
      where: { cIVDfkINV: invoiceId },
      order: { nIVDorder: 'ASC' },
    });
    return entities.map((e) => e.toDomain());
  }

  async deleteByInvoiceId(invoiceId: string): Promise<void> {
    await this.repository.delete({ cIVDfkINV: invoiceId });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { cIVDpk: id },
    });
    return count > 0;
  }

  async getOnHandByStockId(stockId: string, warehouseId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('d')
      .innerJoin('invoice', 'i', 'd.cIVDfkINV = i.cINVpk')
      .select(
        `SUM(CASE WHEN (i.cINVTransfer IS NULL OR i.cINVTransfer = 'n/a') THEN (d.nIVDzqtyin - d.nIVDzqtyout) ELSE 0 END) + ` +
        `SUM(CASE WHEN (i.cINVTransfer IS NOT NULL AND i.cINVTransfer <> 'n/a') THEN (d.nIVDzqtyout - d.nIVDzqtyin) ELSE 0 END)`,
        'onHand',
      )
      .where(`i.cINVspecial <> 'KS'`)
      .andWhere('d.cIVDfkSTK = :stockId', { stockId })
      .andWhere('d.nIVDkirim = 1')
      .andWhere(
        `((i.cINVfkWHS = :warehouseId AND i.cINVfkWHS IS NOT NULL AND (i.cINVTransfer IS NULL OR i.cINVTransfer = 'n/a')) OR ` +
        `(i.cINVTransfer = :warehouseId AND i.cINVTransfer IS NOT NULL AND i.cINVTransfer <> 'n/a'))`,
        { warehouseId },
      )
      .getRawOne();
    return Number(result?.onHand ?? 0);
  }

  async sumAmountsByInvoiceIds(invoiceIds: string[]): Promise<Map<string, number>> {
    const map = new Map<string, number>();
    if (!invoiceIds.length) return map;
    const rows = await this.repository
      .createQueryBuilder('ivd')
      .select('ivd.cIVDfkINV', 'invoiceId')
      .addSelect('SUM(ivd.nIVDAmount)', 'total')
      .where('ivd.cIVDfkINV IN (:...ids)', { ids: invoiceIds })
      .groupBy('ivd.cIVDfkINV')
      .getRawMany();
    rows.forEach((r) => map.set(r.invoiceId, Number(r.total ?? 0)));
    return map;
  }
}
