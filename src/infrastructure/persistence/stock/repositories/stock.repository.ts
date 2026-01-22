import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IStockRepository } from '../../../../core/stock/repositories/stock.repository.interface';
import { Stock } from '../../../../core/stock/entities/stock.entity';
import { StockTypeOrmEntity } from '../entities/stock-typeorm.entity';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class StockRepository implements IStockRepository {
  constructor(
    @InjectRepository(StockTypeOrmEntity)
    private readonly repository: Repository<StockTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Stock[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => entity.toDomain());
  }

  async findOne(id: string): Promise<Stock | null> {
    const entity = await this.repository.findOne({
      where: { cSTKpk: id },
    });
    return entity ? entity.toDomain() : null;
  }

  async findByDescription(description: string): Promise<Stock | null> {
    const entity = await this.repository.findOne({
      where: { cSTKdesc: description },
    });
    return entity ? entity.toDomain() : null;
  }

  async create(stock: Partial<Stock>): Promise<Stock> {
    const entity = StockTypeOrmEntity.fromDomain(stock);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(
    id: string,
    updateData: Partial<Stock>,
  ): Promise<Stock> {
    // Convert domain entity fields to TypeORM entity fields for update
    const updateFields: Partial<StockTypeOrmEntity> = {};
    
    // Map all fields from domain to TypeORM
    const entity = StockTypeOrmEntity.fromDomain(updateData);
    Object.keys(entity).forEach((key) => {
      if (entity[key] !== undefined) {
        updateFields[key] = entity[key];
      }
    });
    
    await this.repository.update({ cSTKpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Stock with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cSTKpk: id });
    if (result.affected === 0) {
      throw new Error(`Stock with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cSTKpk: id } });
    return count > 0;
  }

  async existsByDescription(description: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cSTKdesc: description } });
    return count > 0;
  }

  async countByStockGroupId(stockGroupId: string): Promise<number> {
    // Count stocks where cSTKfkGRP matches the stockGroupId
    const count = await this.repository.count({
      where: { 
        cSTKfkGRP: stockGroupId 
      }
    });
    return count;
  }
}

