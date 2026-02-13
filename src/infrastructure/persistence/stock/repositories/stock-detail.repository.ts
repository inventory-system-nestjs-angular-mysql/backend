import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IStockDetailRepository } from '../../../../core/stock/repositories/stock-detail.repository.interface';
import { StockDetail } from '../../../../core/stock/entities/stock-detail.entity';
import { StockDetailTypeOrmEntity } from '../entities/stock-detail-typeorm.entity';

const DEFAULT_PK = '..default..............';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class StockDetailRepository implements IStockDetailRepository {
  constructor(
    @InjectRepository(StockDetailTypeOrmEntity)
    private readonly repository: Repository<StockDetailTypeOrmEntity>,
  ) {}

  async findAll(): Promise<StockDetail[]> {
    const entities = await this.repository.find();
    return entities
      .map((entity) => entity.toDomain())
      .filter((detail) => detail.id !== DEFAULT_PK);
  }

  async findByStockId(stockId: string): Promise<StockDetail[]> {
    const entities = await this.repository.find({
      where: { cSTDfkSTK: stockId },
    });
    return entities.map((entity) => entity.toDomain());
  }

  async findOne(id: string): Promise<StockDetail | null> {
    const entity = await this.repository.findOne({ where: { cSTDpk: id } });
    return entity ? entity.toDomain() : null;
  }

  async create(stockDetail: Partial<StockDetail>): Promise<StockDetail> {
    const entity = StockDetailTypeOrmEntity.fromDomain(stockDetail);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async createMany(stockDetails: Partial<StockDetail>[]): Promise<StockDetail[]> {
    const entities = stockDetails.map((detail) =>
      StockDetailTypeOrmEntity.fromDomain(detail),
    );
    const saved = await this.repository.save(entities);
    return saved.map((entity) => entity.toDomain());
  }

  async update(
    id: string,
    updateData: Partial<StockDetail>,
  ): Promise<StockDetail> {
    // Convert domain entity fields to TypeORM entity fields for update
    const entity = StockDetailTypeOrmEntity.fromDomain(updateData);
    const updateFields: Partial<StockDetailTypeOrmEntity> = {};
    
    Object.keys(entity).forEach((key) => {
      if (entity[key] !== undefined) {
        updateFields[key] = entity[key];
      }
    });
    
    await this.repository.update({ cSTDpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`StockDetail with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cSTDpk: id });
    if (result.affected === 0) {
      throw new Error(`StockDetail with id ${id} not found`);
    }
  }

  async deleteByStockId(stockId: string): Promise<void> {
    await this.repository.delete({ cSTDfkSTK: stockId });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cSTDpk: id } });
    return count > 0;
  }
}

