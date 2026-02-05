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
}
