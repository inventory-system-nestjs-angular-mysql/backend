import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { ICustomerRepository } from '../../../../core/customer/repositories/customer.repository.interface';
import { CUSTOMER_REPOSITORY } from '../../../../core/customer/repositories/repository.tokens';
import { Customer } from '../../../../core/customer/entities/customer.entity';
import { CreateCustomerDto } from '../../../../presentation/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../../../presentation/customer/dto/update-customer.dto';
import { CustomerResponseDto } from '../../../../presentation/customer/dto/customer-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class CustomerService extends BaseService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {
    super();
  }

  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponseDto> {
    const id = await this.generateUniqueId(
      (id) => this.customerRepository.exists(id),
      'Unable to generate a unique primary key for Customer',
    );

    const existsByCode = await this.customerRepository.existsByCode(
      createCustomerDto.code,
    );
    if (existsByCode) {
      throw new ConflictException(
        `Customer with code '${createCustomerDto.code}' already exists`,
      );
    }

    const existsByDesc = await this.customerRepository.existsByDescription(
      createCustomerDto.name,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `Customer with name '${createCustomerDto.name}' already exists`,
      );
    }

    const customerPartial: Partial<Customer> = {
      id,
      code: createCustomerDto.code,
      description: createCustomerDto.name,
      cityId: createCustomerDto.cityId ?? null,
      address1: createCustomerDto.address1 ?? null,
      address2: createCustomerDto.address2 ?? null,
      address3: createCustomerDto.address3 ?? null,
      address4: createCustomerDto.address4 ?? null,
      address5: createCustomerDto.address5 ?? null,
      npwp: createCustomerDto.npwp ?? null,
      nppkp: createCustomerDto.nppkp ?? null,
      creditLimit: createCustomerDto.creditLimit ?? 0,
      outstandingLimit: createCustomerDto.outstandingLimit ?? 0,
      discount: createCustomerDto.discount ?? 0,
      term: createCustomerDto.term ?? 0,
      billToSame: createCustomerDto.billToSame ?? true,
      billToName: createCustomerDto.billToName ?? null,
      billToAddress1: createCustomerDto.billToAddress1 ?? null,
      billToAddress2: createCustomerDto.billToAddress2 ?? null,
      billToAddress3: createCustomerDto.billToAddress3 ?? null,
      billToAddress4: createCustomerDto.billToAddress4 ?? null,
      createDate: createCustomerDto.createDate,
      lastDate: createCustomerDto.lastDate ?? null,
      isSuspended: createCustomerDto.isSuspended ?? false,
      memo: createCustomerDto.memo ?? null,
      isCustomer: true,
      imagePath: createCustomerDto.imagePath ?? null,
      visitFrequency: createCustomerDto.visitFrequency ?? null,
      email: createCustomerDto.email ?? null,
      email2: createCustomerDto.email2 ?? null,
      email3: createCustomerDto.email3 ?? null,
      zip: createCustomerDto.zip ?? null,
      telephone: createCustomerDto.telephone ?? null,
      birthday: createCustomerDto.birthday ?? null,
      religion: createCustomerDto.religion ?? null,
      distance: createCustomerDto.distance ?? null,
      freight: createCustomerDto.freight ?? null,
      priceType: createCustomerDto.priceType ?? null,
      salesmanId: createCustomerDto.salesmanId ?? null,
      gender: createCustomerDto.gender ?? null,
      nik: createCustomerDto.nik ?? null,
    };

    const customer = await this.customerRepository.create(customerPartial);
    return this.mapToResponseDto(customer);
  }

  async findAll(): Promise<CustomerResponseDto[]> {
    const customers = await this.customerRepository.findAll();
    return customers.map((customer) => this.mapToResponseDto(customer));
  }

  async findOne(id: string): Promise<CustomerResponseDto> {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id '${id}' not found`);
    }
    return this.mapToResponseDto(customer);
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    const exists = await this.customerRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Customer with id '${id}' not found`);
    }

    if (updateCustomerDto.code) {
      const existingByCode = await this.customerRepository.findByCode(updateCustomerDto.code);
      if (existingByCode && existingByCode.id !== id) {
        throw new ConflictException(
          `Customer with code '${updateCustomerDto.code}' already exists`,
        );
      }
    }

    if (updateCustomerDto.name) {
      const existingByDesc = await this.customerRepository.findByDescription(updateCustomerDto.name);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `Customer with name '${updateCustomerDto.name}' already exists`,
        );
      }
    }

    const updateData: Partial<Customer> = {
      ...(updateCustomerDto.code !== undefined && { code: updateCustomerDto.code }),
      ...(updateCustomerDto.name !== undefined && { description: updateCustomerDto.name }),
      ...(updateCustomerDto.cityId !== undefined && { cityId: updateCustomerDto.cityId }),
      ...(updateCustomerDto.address1 !== undefined && { address1: updateCustomerDto.address1 }),
      ...(updateCustomerDto.address2 !== undefined && { address2: updateCustomerDto.address2 }),
      ...(updateCustomerDto.address3 !== undefined && { address3: updateCustomerDto.address3 }),
      ...(updateCustomerDto.address4 !== undefined && { address4: updateCustomerDto.address4 }),
      ...(updateCustomerDto.address5 !== undefined && { address5: updateCustomerDto.address5 }),
      ...(updateCustomerDto.npwp !== undefined && { npwp: updateCustomerDto.npwp }),
      ...(updateCustomerDto.nppkp !== undefined && { nppkp: updateCustomerDto.nppkp }),
      ...(updateCustomerDto.creditLimit !== undefined && { creditLimit: updateCustomerDto.creditLimit }),
      ...(updateCustomerDto.outstandingLimit !== undefined && { outstandingLimit: updateCustomerDto.outstandingLimit }),
      ...(updateCustomerDto.discount !== undefined && { discount: updateCustomerDto.discount }),
      ...(updateCustomerDto.term !== undefined && { term: updateCustomerDto.term }),
      ...(updateCustomerDto.billToSame !== undefined && { billToSame: updateCustomerDto.billToSame }),
      ...(updateCustomerDto.billToName !== undefined && { billToName: updateCustomerDto.billToName }),
      ...(updateCustomerDto.billToAddress1 !== undefined && { billToAddress1: updateCustomerDto.billToAddress1 }),
      ...(updateCustomerDto.billToAddress2 !== undefined && { billToAddress2: updateCustomerDto.billToAddress2 }),
      ...(updateCustomerDto.billToAddress3 !== undefined && { billToAddress3: updateCustomerDto.billToAddress3 }),
      ...(updateCustomerDto.billToAddress4 !== undefined && { billToAddress4: updateCustomerDto.billToAddress4 }),
      ...(updateCustomerDto.createDate !== undefined && { createDate: updateCustomerDto.createDate }),
      ...(updateCustomerDto.lastDate !== undefined && { lastDate: updateCustomerDto.lastDate }),
      ...(updateCustomerDto.isSuspended !== undefined && { isSuspended: updateCustomerDto.isSuspended }),
      ...(updateCustomerDto.memo !== undefined && { memo: updateCustomerDto.memo }),
      ...(updateCustomerDto.imagePath !== undefined && { imagePath: updateCustomerDto.imagePath }),
      ...(updateCustomerDto.visitFrequency !== undefined && { visitFrequency: updateCustomerDto.visitFrequency }),
      ...(updateCustomerDto.email !== undefined && { email: updateCustomerDto.email }),
      ...(updateCustomerDto.email2 !== undefined && { email2: updateCustomerDto.email2 }),
      ...(updateCustomerDto.email3 !== undefined && { email3: updateCustomerDto.email3 }),
      ...(updateCustomerDto.zip !== undefined && { zip: updateCustomerDto.zip }),
      ...(updateCustomerDto.telephone !== undefined && { telephone: updateCustomerDto.telephone }),
      ...(updateCustomerDto.birthday !== undefined && { birthday: updateCustomerDto.birthday }),
      ...(updateCustomerDto.religion !== undefined && { religion: updateCustomerDto.religion }),
      ...(updateCustomerDto.distance !== undefined && { distance: updateCustomerDto.distance }),
      ...(updateCustomerDto.freight !== undefined && { freight: updateCustomerDto.freight }),
      ...(updateCustomerDto.priceType !== undefined && { priceType: updateCustomerDto.priceType }),
      ...(updateCustomerDto.salesmanId !== undefined && { salesmanId: updateCustomerDto.salesmanId }),
      ...(updateCustomerDto.gender !== undefined && { gender: updateCustomerDto.gender }),
      ...(updateCustomerDto.nik !== undefined && { nik: updateCustomerDto.nik }),
    };

    const updated = await this.customerRepository.update(id, updateData);
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.customerRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Customer with id '${id}' not found`);
    }
    await this.customerRepository.delete(id);
  }

  private mapToResponseDto(customer: Customer): CustomerResponseDto {
    return {
      id: customer.id,
      code: customer.code,
      name: customer.description,
      cityId: customer.cityId,
      address1: customer.address1,
      address2: customer.address2,
      address3: customer.address3,
      address4: customer.address4,
      address5: customer.address5,
      npwp: customer.npwp,
      nppkp: customer.nppkp,
      creditLimit: customer.creditLimit,
      outstandingLimit: customer.outstandingLimit,
      discount: customer.discount,
      term: customer.term,
      billToSame: customer.billToSame,
      billToName: customer.billToName,
      billToAddress1: customer.billToAddress1,
      billToAddress2: customer.billToAddress2,
      billToAddress3: customer.billToAddress3,
      billToAddress4: customer.billToAddress4,
      createDate: customer.createDate,
      lastDate: customer.lastDate,
      isSuspended: customer.isSuspended,
      memo: customer.memo,
      imagePath: customer.imagePath,
      visitFrequency: customer.visitFrequency,
      email: customer.email,
      email2: customer.email2,
      email3: customer.email3,
      zip: customer.zip,
      telephone: customer.telephone,
      birthday: customer.birthday,
      religion: customer.religion,
      distance: customer.distance,
      freight: customer.freight,
      priceType: customer.priceType,
      salesmanId: customer.salesmanId,
      gender: customer.gender,
      nik: customer.nik,
    };
  }
}

