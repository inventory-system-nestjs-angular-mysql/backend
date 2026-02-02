import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInvoiceRepository } from '../../../../core/invoice/repositories/invoice.repository.interface';
import { Invoice } from '../../../../core/invoice/entities/invoice.entity';
import { InvoiceTypeOrmEntity } from '../entities/invoice-typeorm.entity';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class InvoiceRepository implements IInvoiceRepository {
  constructor(
    @InjectRepository(InvoiceTypeOrmEntity)
    private readonly repository: Repository<InvoiceTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    const entities = await this.repository.find({
      order: { dINVdate: 'DESC' },
    });
    return entities.map((entity) => entity.toDomain());
  }

  async findOne(id: string): Promise<Invoice | null> {
    const entity = await this.repository.findOne({
      where: { cINVpk: id },
    });
    return entity ? entity.toDomain() : null;
  }

  async findByEntityId(entityId: string, special?: string): Promise<Invoice[]> {
    // Ensure entityId is valid
    if (!entityId || !entityId.trim()) {
      return [];
    }
    
    const trimmedEntityId = entityId.trim();
    const where: any = { cINVfkENT: trimmedEntityId };
    
    // Filter by special type if provided
    if (special) {
      where.cINVspecial = special;
    }
    
    const entities = await this.repository.find({
      where,
      order: { dINVdate: 'DESC' },
    });
    return entities.map((entity) => entity.toDomain());
  }

  async findByRefNo(refNo: string): Promise<Invoice | null> {
    const entity = await this.repository.findOne({
      where: { cINVrefno: refNo },
    });
    return entity ? entity.toDomain() : null;
  }

  async create(invoice: Partial<Invoice>): Promise<Invoice> {
    const entity = InvoiceTypeOrmEntity.fromDomain(invoice);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(id: string, updateData: Partial<Invoice>): Promise<Invoice> {
    const entity = InvoiceTypeOrmEntity.fromDomain(updateData);
    const updateFields: Partial<InvoiceTypeOrmEntity> = {};
    Object.keys(entity).forEach((key) => {
      if (entity[key] !== undefined && key !== 'cINVpk') {
        updateFields[key] = entity[key];
      }
    });
    
    await this.repository.update({ cINVpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Invoice with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cINVpk: id });
    if (result.affected === 0) {
      throw new Error(`Invoice with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { cINVpk: id },
    });
    return count > 0;
  }
}

