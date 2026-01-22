import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICityRepository } from '../../../../core/city/repositories/city.repository.interface';
import { City } from '../../../../core/city/entities/city.entity';
import { CityTypeOrmEntity } from '../entities/city-typeorm.entity';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class CityRepository implements ICityRepository {
  constructor(
    @InjectRepository(CityTypeOrmEntity)
    private readonly repository: Repository<CityTypeOrmEntity>,
  ) {}

  async findAll(): Promise<City[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => entity.toDomain());
  }

  async findOne(id: string): Promise<City | null> {
    const entity = await this.repository.findOne({ where: { cCITpk: id } });
    return entity ? entity.toDomain() : null;
  }

  async findByDescription(description: string): Promise<City | null> {
    const entity = await this.repository.findOne({ where: { cCITdesc: description } });
    return entity ? entity.toDomain() : null;
  }

  async createNewSerialNumber(): Promise<string | null> {
    const maxSerialEntity = await this.repository
      .createQueryBuilder('city')
      .select('MAX(city.serino)', 'max')
      .getRawOne();

    var newSerial = (parseInt(maxSerialEntity?.max ?? 0) + 1).toString();
    return newSerial ?? null;
  }

  async create(city: Partial<City>): Promise<City> {
    const entity = CityTypeOrmEntity.fromDomain(city);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(
    id: string,
    updateData: Partial<City>,
  ): Promise<City> {
    // Convert domain entity fields to TypeORM entity fields for update
    const updateFields: Partial<CityTypeOrmEntity> = {};
    if (updateData.id !== undefined) updateFields.cCITpk = updateData.id;
    if (updateData.description !== undefined) updateFields.cCITdesc = updateData.description;
    if (updateData.serialNumber !== undefined) updateFields.serino = updateData.serialNumber;
    
    await this.repository.update({ cCITpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`City with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cCITpk: id });
    if (result.affected === 0) {
      throw new Error(`City with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cCITpk: id } });
    return count > 0;
  }

  async existsByDescription(description: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cCITdesc: description } });
    return count > 0;
  }
}

