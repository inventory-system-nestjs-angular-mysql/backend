import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IWarehouseRepository } from '../../../../core/warehouse/repositories/warehouse.repository.interface';
import { Warehouse } from '../../../../core/warehouse/entities/warehouse.entity';
import { WarehouseTypeOrmEntity } from '../entities/warehouse-typeorm.entity';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class WarehouseRepository implements IWarehouseRepository {
  constructor(
    @InjectRepository(WarehouseTypeOrmEntity)
    private readonly repository: Repository<WarehouseTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Warehouse[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => entity.toDomain());
  }

  async findOne(id: string): Promise<Warehouse | null> {
    const entity = await this.repository.findOne({ where: { cWHSpk: id } });
    return entity ? entity.toDomain() : null;
  }

  async findByDescription(description: string): Promise<Warehouse | null> {
    const entity = await this.repository.findOne({ where: { cWHSdesc: description } });
    return entity ? entity.toDomain() : null;
  }

  async createNewSerialNumber(): Promise<string | null> {
    const maxSerialEntity = await this.repository
      .createQueryBuilder('warehouse')
      .select('MAX(warehouse.serino)', 'max')
      .getRawOne();

    var newSerial = (parseInt(maxSerialEntity?.max ?? 0) + 1).toString();
    return newSerial ?? null;
  }

  async create(warehouse: Partial<Warehouse>): Promise<Warehouse> {
    const entity = WarehouseTypeOrmEntity.fromDomain(warehouse);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(
    id: string,
    updateData: Partial<Warehouse>,
  ): Promise<Warehouse> {
    // Convert domain entity fields to TypeORM entity fields for update
    const updateFields: Partial<WarehouseTypeOrmEntity> = {};
    if (updateData.id !== undefined) updateFields.cWHSpk = updateData.id;
    if (updateData.description !== undefined) updateFields.cWHSdesc = updateData.description;
    if (updateData.serialNumber !== undefined) updateFields.serino = updateData.serialNumber;
    if (updateData.refNo !== undefined) updateFields.cWHSrefno = updateData.refNo;
    if (updateData.kepalaSeri !== undefined) updateFields.kepalaseri = updateData.kepalaSeri;
    if (updateData.option !== undefined) updateFields.nwhsoption = updateData.option;
    if (updateData.cr !== undefined) updateFields.nwhscr = updateData.cr;
    if (updateData.kepalaSeri1 !== undefined) updateFields.ckepalaseri1 = updateData.kepalaSeri1;
    if (updateData.kepalaSeri2 !== undefined) updateFields.ckepalaseri2 = updateData.kepalaSeri2;
    if (updateData.kepalaSeri3 !== undefined) updateFields.ckepalaseri3 = updateData.kepalaSeri3;
    if (updateData.kepalaSeri4 !== undefined) updateFields.ckepalaseri4 = updateData.kepalaSeri4;
    if (updateData.kepalaSeri5 !== undefined) updateFields.ckepalaseri5 = updateData.kepalaSeri5;
    if (updateData.refNo1 !== undefined) updateFields.cwhsrefno1 = updateData.refNo1;
    if (updateData.refNo2 !== undefined) updateFields.cwhsrefno2 = updateData.refNo2;
    if (updateData.refNo3 !== undefined) updateFields.cwhsrefno3 = updateData.refNo3;
    if (updateData.refNo4 !== undefined) updateFields.cwhsrefno4 = updateData.refNo4;
    if (updateData.refNo5 !== undefined) updateFields.cwhsrefno5 = updateData.refNo5;
    if (updateData.lok1 !== undefined) updateFields.cwhslok1 = updateData.lok1;
    if (updateData.lok2 !== undefined) updateFields.cwhslok2 = updateData.lok2;
    if (updateData.lok3 !== undefined) updateFields.cwhslok3 = updateData.lok3;
    if (updateData.min !== undefined) updateFields.nwhsmin = updateData.min;
    if (updateData.max !== undefined) updateFields.nwhsmax = updateData.max;
    if (updateData.slipat !== undefined) updateFields.nwhslipat = updateData.slipat;
    if (updateData.kepalaSeri1b !== undefined) updateFields.ckepalaseri1b = updateData.kepalaSeri1b;
    if (updateData.kepalaSeri1c !== undefined) updateFields.ckepalaseri1c = updateData.kepalaSeri1c;
    if (updateData.refNo1b !== undefined) updateFields.cwhsrefno1b = updateData.refNo1b;
    if (updateData.refNo1c !== undefined) updateFields.cwhsrefno1c = updateData.refNo1c;
    
    await this.repository.update({ cWHSpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Warehouse with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cWHSpk: id });
    if (result.affected === 0) {
      throw new Error(`Warehouse with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cWHSpk: id } });
    return count > 0;
  }

  async existsByDescription(description: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cWHSdesc: description } });
    return count > 0;
  }
}

