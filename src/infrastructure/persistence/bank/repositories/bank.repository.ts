import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBankRepository } from '../../../../core/bank/repositories/bank.repository.interface';
import { Bank } from '../../../../core/bank/entities/bank.entity';
import { BankTypeOrmEntity } from '../entities/bank-typeorm.entity';

const DEFAULT_PK = '..default..............';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 */
@Injectable()
export class BankRepository implements IBankRepository {
  constructor(
    @InjectRepository(BankTypeOrmEntity)
    private readonly repository: Repository<BankTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Bank[]> {
    const entities = await this.repository.find({
      order: { cBANdesc: 'ASC' },
    });
    return entities
      .map((entity) => entity.toDomain())
      .filter((bank) => bank.id !== DEFAULT_PK);
  }

  async findOne(id: string): Promise<Bank | null> {
    const entity = await this.repository.findOne({ where: { cBANpk: id } });
    return entity ? entity.toDomain() : null;
  }

  async findByDescription(description: string): Promise<Bank | null> {
    const entity = await this.repository.findOne({ where: { cBANdesc: description } });
    return entity ? entity.toDomain() : null;
  }

  async createNewSerialNumber(): Promise<string | null> {
    const maxSerialEntity = await this.repository
      .createQueryBuilder('bank')
      .select('MAX(bank.serino)', 'max')
      .getRawOne();

    var newSerial = (parseInt(maxSerialEntity?.max ?? 0) + 1).toString();
    return newSerial ?? null;
  }

  async create(bank: Partial<Bank>): Promise<Bank> {
    const entity = BankTypeOrmEntity.fromDomain(bank);
    const saved = await this.repository.save(entity);
    return saved.toDomain();
  }

  async update(
    id: string,
    updateData: Partial<Bank>,
  ): Promise<Bank> {
    // Convert domain entity fields to TypeORM entity fields for update
    const updateFields: Partial<BankTypeOrmEntity> = {};
    if (updateData.id !== undefined) updateFields.cBANpk = updateData.id;
    if (updateData.description !== undefined) updateFields.cBANdesc = updateData.description;
    if (updateData.gl !== undefined) updateFields.cBANgl = updateData.gl;
    if (updateData.account !== undefined) updateFields.cBANacc = updateData.account;
    if (updateData.serialNumber !== undefined) updateFields.serino = updateData.serialNumber;
    
    await this.repository.update({ cBANpk: id }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Bank with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cBANpk: id });
    if (result.affected === 0) {
      throw new Error(`Bank with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cBANpk: id } });
    return count > 0;
  }

  async existsByDescription(description: string): Promise<boolean> {
    const count = await this.repository.count({ where: { cBANdesc: description } });
    return count > 0;
  }
}

