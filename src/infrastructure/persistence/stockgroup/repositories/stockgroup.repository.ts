import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IStockGroupRepository } from '../../../../core/stockgroup/repositories/stockgroup.repository.interface';
import { StockGroup } from '../../../../core/stockgroup/entities/stockgroup.entity';
import { StockGroupTypeOrmEntity } from '../entities/stockgroup-typeorm.entity';

const DEFAULT_PK = '..default..............';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class StockGroupRepository implements IStockGroupRepository {
  constructor(
    @InjectRepository(StockGroupTypeOrmEntity)
    private readonly repository: Repository<StockGroupTypeOrmEntity>,
  ) {}

  async findAll(): Promise<StockGroup[]> {
    const entities = await this.repository.find({
      order: { cGRPdesc: 'ASC' },
    });
    return entities
      .map((entity) => entity.toDomain())
      .filter((group) => group.id !== DEFAULT_PK);
  }

  async findOne(id: string): Promise<StockGroup | null> {
    const entity = await this.repository.findOne({ where: { cGRPpk: id } });
    return entity ? entity.toDomain() : null;
  }

  async findByDescription(description: string): Promise<StockGroup | null> {
    const entity = await this.repository.findOne({ where: { cGRPdesc: description } });
    return entity ? entity.toDomain() : null;
  }

  async createNewSerialNumber(): Promise<string | null> {
    const maxSerialEntity = await this.repository
      .createQueryBuilder('stockgroup')
      .select('MAX(stockgroup.serino)', 'max')
      .getRawOne();

    var newSerial = (parseInt(maxSerialEntity?.max ?? 0) + 1).toString();
    return newSerial ?? null;
  }

  async create(stockGroup: Partial<StockGroup>): Promise<StockGroup> {
    const entity = StockGroupTypeOrmEntity.fromDomain(stockGroup);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(
    id: string,
    updateData: Partial<StockGroup>,
  ): Promise<StockGroup> {
    // Convert domain entity fields to TypeORM entity fields for update
    const updateFields: Partial<StockGroupTypeOrmEntity> = {};
    if (updateData.id !== undefined) updateFields.cGRPpk = updateData.id;
    if (updateData.description !== undefined) updateFields.cGRPdesc = updateData.description;
    if (updateData.serialNumber !== undefined) updateFields.serino = updateData.serialNumber;
    if (updateData.markupAmount1 !== undefined) updateFields.markrp1 = updateData.markupAmount1;
    if (updateData.markupPercentage1 !== undefined) updateFields.markpersen1 = updateData.markupPercentage1;
    if (updateData.markupAmount2 !== undefined) updateFields.markrp2 = updateData.markupAmount2;
    if (updateData.markupPercentage2 !== undefined) updateFields.markpersen2 = updateData.markupPercentage2;
    if (updateData.groupValue !== undefined) updateFields.ngrpnilai = updateData.groupValue;
    if (updateData.groupValueDollar !== undefined) updateFields.ngrpdollar = updateData.groupValueDollar;
    if (updateData.groupCode !== undefined) updateFields.cgrpkep = updateData.groupCode;
    if (updateData.quantity !== undefined) updateFields.ngrpqty = updateData.quantity;
    
    await this.repository.update({ cGRPpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`StockGroup with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cGRPpk: id });
    if (result.affected === 0) {
      throw new Error(`StockGroup with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cGRPpk: id } });
    return count > 0;
  }

  async existsByDescription(description: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cGRPdesc: description } });
    return count > 0;
  }
}

