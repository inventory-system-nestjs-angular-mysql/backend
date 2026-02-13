import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISalesmanRepository } from '../../../../core/salesman/repositories/salesman.repository.interface';
import { Salesman } from '../../../../core/salesman/entities/salesman.entity';
import { SalesmanTypeOrmEntity } from '../entities/salesman-typeorm.entity';

const DEFAULT_PK = '..default..............';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class SalesmanRepository implements ISalesmanRepository {
  constructor(
    @InjectRepository(SalesmanTypeOrmEntity)
    private readonly repository: Repository<SalesmanTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Salesman[]> {
    const entities = await this.repository.find({
      order: { cSAMdesc: 'ASC' },
    });
    return entities
      .map((entity) => entity.toDomain())
      .filter((salesman) => salesman.id !== DEFAULT_PK);
  }

  async findOne(id: string): Promise<Salesman | null> {
    const entity = await this.repository.findOne({
      where: { cSAMpk: id },
    });
    return entity ? entity.toDomain() : null;
  }

  async findByDescription(description: string): Promise<Salesman | null> {
    const entity = await this.repository.findOne({
      where: { cSAMdesc: description },
    });
    return entity ? entity.toDomain() : null;
  }

  async create(salesman: Partial<Salesman>): Promise<Salesman> {
    const entity = SalesmanTypeOrmEntity.fromDomain(salesman);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(
    id: string,
    updateData: Partial<Salesman>,
  ): Promise<Salesman> {
    // Convert domain entity fields to TypeORM entity fields for update
    const updateFields: Partial<SalesmanTypeOrmEntity> = {};
    const entity = SalesmanTypeOrmEntity.fromDomain(updateData);
    Object.keys(entity).forEach((key) => {
      if (entity[key] !== undefined) {
        updateFields[key] = entity[key];
      }
    });
    
    await this.repository.update({ cSAMpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Salesman with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cSAMpk: id });
    if (result.affected === 0) {
      throw new Error(`Salesman with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { cSAMpk: id },
    });
    return count > 0;
  }

  async existsByDescription(description: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { cSAMdesc: description },
    });
    return count > 0;
  }
}

