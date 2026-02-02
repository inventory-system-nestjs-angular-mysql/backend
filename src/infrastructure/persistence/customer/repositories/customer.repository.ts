import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerRepository } from '../../../../core/customer/repositories/customer.repository.interface';
import { Customer } from '../../../../core/customer/entities/customer.entity';
import { EntityTypeOrmEntity } from '../../entity/entities/entity-typeorm.entity';

/**
 * Infrastructure Layer - Repository Implementation
 * Implements the domain repository interface using TypeORM
 * Uses shared EntityTypeOrmEntity, filtered by nENTcust = 1
 */
@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(EntityTypeOrmEntity)
    private readonly repository: Repository<EntityTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Customer[]> {
    // Filter by nENTcust = 1 to get only customers
    const entities = await this.repository.find({
      where: { nENTcust: 1 },
    });
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async findOne(id: string): Promise<Customer | null> {
    const entity = await this.repository.findOne({
      where: { cENTpk: id, nENTcust: 1 },
    });
    return entity ? this.mapToDomain(entity) : null;
  }

  async findByCode(code: string): Promise<Customer | null> {
    const entity = await this.repository.findOne({
      where: { cENTcode: code, nENTcust: 1 },
    });
    return entity ? this.mapToDomain(entity) : null;
  }

  async findByDescription(description: string): Promise<Customer | null> {
    const entity = await this.repository.findOne({
      where: { cENTdesc: description, nENTcust: 1 },
    });
    return entity ? this.mapToDomain(entity) : null;
  }

  async create(customer: Partial<Customer>): Promise<Customer> {
    const entity = this.mapToEntity(customer);
    // Ensure nENTcust is set to 1 for customers
    entity.nENTcust = 1;
    entity.nENTsupp = 0; // Not a supplier
    const saved = await this.repository.save(entity);
    return this.mapToDomain(saved);
  }

  async update(
    id: string,
    updateData: Partial<Customer>,
  ): Promise<Customer> {
    // Convert domain entity fields to TypeORM entity fields for update
    const updateFields: Partial<EntityTypeOrmEntity> = {};
    const entity = this.mapToEntity(updateData);
    Object.keys(entity).forEach((key) => {
      if (entity[key] !== undefined) {
        updateFields[key] = entity[key];
      }
    });
    
    await this.repository.update({ cENTpk: id, nENTcust: 1 }, updateFields);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Customer with id ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete({ cENTpk: id, nENTcust: 1 });
    if (result.affected === 0) {
      throw new Error(`Customer with id ${id} not found`);
    }
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { cENTpk: id, nENTcust: 1 },
    });
    return count > 0;
  }

  async existsByCode(code: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { cENTcode: code, nENTcust: 1 },
    });
    return count > 0;
  }

  async existsByDescription(description: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { cENTdesc: description, nENTcust: 1 },
    });
    return count > 0;
  }

  /**
   * Maps TypeORM entity to Customer domain entity
   */
  private mapToDomain(entity: EntityTypeOrmEntity): Customer {
    const domain = new Customer();
    domain.id = entity.cENTpk;
    domain.code = entity.cENTcode || '';
    domain.description = entity.cENTdesc;
    domain.cityId = entity.cENTfkCIT || null;
    domain.address1 = entity.cENTadd1;
    domain.address2 = entity.cENTadd2;
    domain.address3 = entity.cENTadd3;
    domain.address4 = entity.cENTadd4;
    domain.address5 = entity.cENTadd5;
    domain.npwp = entity.cENTnpwp || null;
    domain.nppkp = entity.cENTnppkp || null;
    domain.creditLimit = entity.nENTlimit;
    domain.outstandingLimit = entity.nentjatah;
    domain.discount = entity.nENTdisc;
    domain.term = entity.nENTterm;
    domain.billToSame = entity.nENTsame === 1;
    domain.billToName = entity.cENTbill;
    domain.billToAddress1 = entity.cENTbadd1;
    domain.billToAddress2 = entity.cENTbadd2;
    domain.billToAddress3 = entity.cENTbadd3;
    domain.billToAddress4 = entity.cENTbadd4;
    domain.createDate = entity.dENTcreate ? entity.dENTcreate.toString() : null;
    domain.lastDate = entity.dENTlast ? entity.dENTlast.toString() : null;
    domain.isSuspended = entity.nENTsuspend === 1;
    domain.memo = entity.cENTmemo;
    domain.isCustomer = entity.nENTcust === 1;
    domain.imagePath = entity.cENTimage;
    domain.serialNumber = entity.serino;
    domain.visitFrequency = entity.nENTvisit;
    domain.email = entity.centemail || null;
    domain.email2 = entity.centemail2 || null;
    domain.email3 = entity.centemail3 || null;
    domain.zip = entity.cent52 || null;
    domain.telephone = entity.cent50 || null;
    domain.birthday = entity.dentcdob ? entity.dentcdob.toString() : null;
    domain.religion = entity.centagama;
    domain.distance = entity.nENTjarak || null;
    domain.freight = entity.ongkos;
    domain.priceType = entity.nenttipe;
    domain.salesmanId = entity.cENTfkSAL || null;
    domain.gender = entity.nentgender;
    domain.nik = entity.cent51 || null;
    return domain;
  }

  /**
   * Maps Customer domain entity to TypeORM entity
   */
  private mapToEntity(domain: Partial<Customer>): EntityTypeOrmEntity {
    const entity = new EntityTypeOrmEntity();
    if (domain.id) entity.cENTpk = domain.id;
    if (domain.code !== undefined) entity.cENTcode = domain.code || 'id';
    if (domain.description !== undefined) entity.cENTdesc = domain.description;
    if (domain.cityId !== undefined) entity.cENTfkCIT = domain.cityId || '';
    if (domain.address1 !== undefined) entity.cENTadd1 = domain.address1;
    if (domain.address2 !== undefined) entity.cENTadd2 = domain.address2;
    if (domain.address3 !== undefined) entity.cENTadd3 = domain.address3;
    if (domain.address4 !== undefined) entity.cENTadd4 = domain.address4;
    if (domain.address5 !== undefined) entity.cENTadd5 = domain.address5;
    if (domain.npwp !== undefined) entity.cENTnpwp = domain.npwp || '';
    if (domain.nppkp !== undefined) entity.cENTnppkp = domain.nppkp || '';
    if (domain.creditLimit !== undefined) entity.nENTlimit = domain.creditLimit;
    if (domain.outstandingLimit !== undefined) entity.nentjatah = domain.outstandingLimit;
    if (domain.discount !== undefined) entity.nENTdisc = domain.discount;
    if (domain.term !== undefined) entity.nENTterm = domain.term;
    if (domain.billToSame !== undefined) entity.nENTsame = domain.billToSame ? 1 : 0;
    if (domain.billToName !== undefined) entity.cENTbill = domain.billToName;
    if (domain.billToAddress1 !== undefined) entity.cENTbadd1 = domain.billToAddress1;
    if (domain.billToAddress2 !== undefined) entity.cENTbadd2 = domain.billToAddress2;
    if (domain.billToAddress3 !== undefined) entity.cENTbadd3 = domain.billToAddress3;
    if (domain.billToAddress4 !== undefined) entity.cENTbadd4 = domain.billToAddress4;
    if (domain.createDate !== undefined) entity.dENTcreate = new Date(domain.createDate);
    if (domain.lastDate !== undefined) entity.dENTlast = new Date(domain.lastDate);
    if (domain.isSuspended !== undefined) entity.nENTsuspend = domain.isSuspended ? 1 : 0;
    if (domain.memo !== undefined) entity.cENTmemo = domain.memo;
    if (domain.isCustomer !== undefined) entity.nENTcust = domain.isCustomer ? 1 : 0;
    if (domain.imagePath !== undefined) entity.cENTimage = domain.imagePath;
    if (domain.serialNumber !== undefined) entity.serino = domain.serialNumber;
    if (domain.visitFrequency !== undefined) entity.nENTvisit = domain.visitFrequency;
    if (domain.email !== undefined) entity.centemail = domain.email || '';
    if (domain.email2 !== undefined) entity.centemail2 = domain.email2 || '';
    if (domain.email3 !== undefined) entity.centemail3 = domain.email3 || '';
    if (domain.zip !== undefined) entity.cent52 = domain.zip || '';
    if (domain.telephone !== undefined) entity.cent50 = domain.telephone || '';
    if (domain.birthday !== undefined) entity.dentcdob = new Date(domain.birthday);
    if (domain.religion !== undefined) entity.centagama = domain.religion;
    if (domain.distance !== undefined) entity.nENTjarak = domain.distance || 0;
    if (domain.freight !== undefined) entity.ongkos = domain.freight;
    if (domain.priceType !== undefined) entity.nenttipe = domain.priceType;
    if (domain.salesmanId !== undefined) entity.cENTfkSAL = domain.salesmanId;
    if (domain.gender !== undefined) entity.nentgender = domain.gender;
    if (domain.nik !== undefined) entity.cent51 = domain.nik || '';
    return entity;
  }
}

