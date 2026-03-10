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

  async getOnHandByStockId(stockId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('ivd')
      .select('SUM(ivd.nIVDzqtyin) - SUM(ivd.nIVDzqtyout)', 'onHand')
      .where('ivd.cIVDfkSTK = :stockId', { stockId })
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
