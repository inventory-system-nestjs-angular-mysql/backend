import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBrandRepository } from '../../../../core/brand/repositories/brand.repository.interface';
import { Brand } from '../../../../core/brand/entities/brand.entity';
import { BrandTypeOrmEntity } from '../entities/brand-typeorm.entity';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class BrandRepository implements IBrandRepository {
  constructor(
    @InjectRepository(BrandTypeOrmEntity)
    private readonly repository: Repository<BrandTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Brand[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => entity.toDomain());
  }

  async findOne(id: string): Promise<Brand | null> {
    const entity = await this.repository.findOne({ where: { cBRDpk: id } });
    return entity ? entity.toDomain() : null;
  }

  async findByDescription(description: string): Promise<Brand | null> {
    const entity = await this.repository.findOne({ where: { cBRDdesc: description } });
    return entity ? entity.toDomain() : null;
  }

  async createNewSerialNumber(): Promise<string | null> {
    const maxSerialEntity = await this.repository
      .createQueryBuilder('brand')
      .select('MAX(brand.serino)', 'max')
      .getRawOne();

    var newSerial = (parseInt(maxSerialEntity?.max ?? 0) + 1).toString();
    return newSerial ?? null;
  }

  async create(brand: Partial<Brand>): Promise<Brand> {
    const entity = BrandTypeOrmEntity.fromDomain(brand);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(
    id: string,
    updateData: Partial<Brand>,
  ): Promise<Brand> {
    // Convert domain entity fields to TypeORM entity fields for update
    const updateFields: Partial<BrandTypeOrmEntity> = {};
    if (updateData.id !== undefined) updateFields.cBRDpk = updateData.id;
    if (updateData.description !== undefined) updateFields.cBRDdesc = updateData.description;
    if (updateData.serialNumber !== undefined) updateFields.serino = updateData.serialNumber;
    
    await this.repository.update({ cBRDpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Brand with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cBRDpk: id });
    if (result.affected === 0) {
      throw new Error(`Brand with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cBRDpk: id } });
    return count > 0;
  }

  async existsByDescription(description: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cBRDdesc: description } });
    return count > 0;
  }
}

