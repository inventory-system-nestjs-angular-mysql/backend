import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUnitRepository } from '../../../../core/unit/repositories/unit.repository.interface';
import { Unit } from '../../../../core/unit/entities/unit.entity';
import { UnitTypeOrmEntity } from '../entities/unit-typeorm.entity';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class UnitRepository implements IUnitRepository {
  constructor(
    @InjectRepository(UnitTypeOrmEntity)
    private readonly repository: Repository<UnitTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Unit[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => entity.toDomain());
  }

  async findOne(id: string): Promise<Unit | null> {
    const entity = await this.repository.findOne({ where: { cUNIpk: id } });
    return entity ? entity.toDomain() : null;
  }

  async findByDescription(description: string): Promise<Unit | null> {
    const entity = await this.repository.findOne({ where: { cUNIdesc: description } });
    return entity ? entity.toDomain() : null;
  }

  async createNewSerialNumber(): Promise<string | null> {
    const maxSerialEntity = await this.repository
      .createQueryBuilder('unit')
      .select('MAX(unit.serino)', 'max')
      .getRawOne();

    var newSerial = (parseInt(maxSerialEntity?.max ?? 0) + 1).toString();
    return newSerial ?? null;
  }

  async create(unit: Partial<Unit>): Promise<Unit> {
    const entity = UnitTypeOrmEntity.fromDomain(unit);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(
    id: string,
    updateData: Partial<Unit>,
  ): Promise<Unit> {
    // Convert domain entity fields to TypeORM entity fields for update
    const updateFields: Partial<UnitTypeOrmEntity> = {};
    if (updateData.id !== undefined) updateFields.cUNIpk = updateData.id;
    if (updateData.description !== undefined) updateFields.cUNIdesc = updateData.description;
    if (updateData.serialNumber !== undefined) updateFields.serino = updateData.serialNumber;
    if (updateData.coreTax !== undefined) updateFields.cunicoretax = updateData.coreTax;
    
    await this.repository.update({ cUNIpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Unit with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cUNIpk: id });
    if (result.affected === 0) {
      throw new Error(`Unit with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cUNIpk: id } });
    return count > 0;
  }

  async existsByDescription(description: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cUNIdesc: description } });
    return count > 0;
  }
}

