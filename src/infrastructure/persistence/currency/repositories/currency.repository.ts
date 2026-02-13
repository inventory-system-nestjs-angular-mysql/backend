import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICurrencyRepository } from '../../../../core/currency/repositories/currency.repository.interface';
import { Currency } from '../../../../core/currency/entities/currency.entity';
import { CurrencyTypeOrmEntity } from '../entities/currency-typeorm.entity';

const DEFAULT_PK = '..default..............';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class CurrencyRepository implements ICurrencyRepository {
  constructor(
    @InjectRepository(CurrencyTypeOrmEntity)
    private readonly repository: Repository<CurrencyTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Currency[]> {
    const entities = await this.repository.find({
      order: { cEXCdesc: 'ASC' },
    });
    return entities
      .map((entity) => entity.toDomain())
      .filter((currency) => currency.id !== DEFAULT_PK);
  }

  async findOne(id: string): Promise<Currency | null> {
    const entity = await this.repository.findOne({ where: { cEXCpk: id } });
    return entity ? entity.toDomain() : null;
  }

  async findByCurrency(currency: string): Promise<Currency | null> {
    const entity = await this.repository.findOne({ where: { cEXCdesc: currency } });
    return entity ? entity.toDomain() : null;
  }

  async createNewSerialNumber(): Promise<string | null> {
    const maxSerialEntity = await this.repository
      .createQueryBuilder('currency')
      .select('MAX(currency.serino)', 'max')
      .getRawOne();

    const newSerial = (parseInt(maxSerialEntity?.max ?? 0) + 1).toString();
    return newSerial ?? null;
  }

  async create(currency: Partial<Currency>): Promise<Currency> {
    const entity = CurrencyTypeOrmEntity.fromDomain(currency);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(
    id: string,
    updateData: Partial<Currency>,
  ): Promise<Currency> {
    const updateFields: Partial<CurrencyTypeOrmEntity> = {};
    if (updateData.currency !== undefined) updateFields.cEXCdesc = updateData.currency;
    if (updateData.rate !== undefined) updateFields.nEXCvalue = updateData.rate;
    if (updateData.taxRate !== undefined) updateFields.nEXCtaxvalue = updateData.taxRate;
    if (updateData.serialNumber !== undefined) updateFields.serino = updateData.serialNumber;
    
    await this.repository.update({ cEXCpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Currency with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cEXCpk: id });
    if (result.affected === 0) {
      throw new Error(`Currency with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cEXCpk: id } });
    return count > 0;
  }

  async existsByCurrency(currency: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cEXCdesc: currency } });
    return count > 0;
  }
}

