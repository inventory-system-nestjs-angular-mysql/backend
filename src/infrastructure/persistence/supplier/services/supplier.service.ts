import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { ISupplierRepository } from '../../../../core/supplier/repositories/supplier.repository.interface';
import { SUPPLIER_REPOSITORY } from '../../../../core/supplier/repositories/repository.tokens';
import { Supplier } from '../../../../core/supplier/entities/supplier.entity';
import { CreateSupplierDto } from '../../../../presentation/supplier/dto/create-supplier.dto';
import { UpdateSupplierDto } from '../../../../presentation/supplier/dto/update-supplier.dto';
import { SupplierResponseDto } from '../../../../presentation/supplier/dto/supplier-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class SupplierService extends BaseService {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: ISupplierRepository,
  ) {
    super();
  }

  async create(
    createSupplierDto: CreateSupplierDto,
  ): Promise<SupplierResponseDto> {
    // Generate a backend primary key (23 chars) and ensure uniqueness
    const id = await this.generateUniqueId(
      (id) => this.supplierRepository.exists(id),
      'Unable to generate a unique primary key for Supplier',
    );

    // Check if code already exists (unique constraint)
    const existsByCode = await this.supplierRepository.existsByCode(
      createSupplierDto.code,
    );
    if (existsByCode) {
      throw new ConflictException(
        `Supplier with code '${createSupplierDto.code}' already exists`,
      );
    }

    // Check if description already exists
    const existsByDesc = await this.supplierRepository.existsByDescription(
      createSupplierDto.name,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `Supplier with name '${createSupplierDto.name}' already exists`,
      );
    }

    // Compose domain partial including generated primary key
    const supplierPartial: Partial<Supplier> = {
      id,
      code: createSupplierDto.code,
      description: createSupplierDto.name,
      cityId: createSupplierDto.cityId ?? null,
      address1: createSupplierDto.address1 ?? null,
      address2: createSupplierDto.address2 ?? null,
      address3: createSupplierDto.address3 ?? null,
      address4: createSupplierDto.address4 ?? null,
      address5: createSupplierDto.address5 ?? null,
      npwp: createSupplierDto.npwp ?? null,
      nppkp: createSupplierDto.nppkp ?? null,
      creditLimit: createSupplierDto.creditLimit ?? 0,
      discount: createSupplierDto.discount ?? 0,
      term: createSupplierDto.term ?? 0,
      billToSame: createSupplierDto.billToSame ?? true,
      billToName: createSupplierDto.billToName ?? null,
      billToAddress1: createSupplierDto.billToAddress1 ?? null,
      billToAddress2: createSupplierDto.billToAddress2 ?? null,
      billToAddress3: createSupplierDto.billToAddress3 ?? null,
      billToAddress4: createSupplierDto.billToAddress4 ?? null,
      createDate: createSupplierDto.createDate ?? new Date(),
      lastDate: createSupplierDto.lastDate ?? null,
      isSuspended: createSupplierDto.isSuspended ?? false,
      memo: createSupplierDto.memo ?? null,
      isSupplier: true, // Always true for suppliers
      imagePath: createSupplierDto.imagePath ?? null,
      visitFrequency: createSupplierDto.visitFrequency ?? null,
      email: createSupplierDto.email ?? null,
      email2: createSupplierDto.email2 ?? null,
      email3: createSupplierDto.email3 ?? null,
    };

    const supplier = await this.supplierRepository.create(supplierPartial);
    return this.mapToResponseDto(supplier);
  }

  async findAll(): Promise<SupplierResponseDto[]> {
    const suppliers = await this.supplierRepository.findAll();
    return suppliers.map((supplier) => this.mapToResponseDto(supplier));
  }

  async findOne(id: string): Promise<SupplierResponseDto> {
    const supplier = await this.supplierRepository.findOne(id);
    if (!supplier) {
      throw new NotFoundException(`Supplier with id '${id}' not found`);
    }
    return this.mapToResponseDto(supplier);
  }

  async update(
    id: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<SupplierResponseDto> {
    // Check if the supplier exists
    const exists = await this.supplierRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Supplier with id '${id}' not found`);
    }

    // If updating code, check for uniqueness
    if (updateSupplierDto.code) {
      const existingByCode =
        await this.supplierRepository.findByCode(updateSupplierDto.code);
      if (existingByCode && existingByCode.id !== id) {
        throw new ConflictException(
          `Supplier with code '${updateSupplierDto.code}' already exists`,
        );
      }
    }

    // If updating name, check for uniqueness
    if (updateSupplierDto.name) {
      const existingByDesc =
        await this.supplierRepository.findByDescription(updateSupplierDto.name);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `Supplier with name '${updateSupplierDto.name}' already exists`,
        );
      }
    }

    // Convert DTO to domain entity format
    const updateData: Partial<Supplier> = {
      ...(updateSupplierDto.code !== undefined && { code: updateSupplierDto.code }),
      ...(updateSupplierDto.name !== undefined && { description: updateSupplierDto.name }),
      ...(updateSupplierDto.cityId !== undefined && { cityId: updateSupplierDto.cityId }),
      ...(updateSupplierDto.address1 !== undefined && { address1: updateSupplierDto.address1 }),
      ...(updateSupplierDto.address2 !== undefined && { address2: updateSupplierDto.address2 }),
      ...(updateSupplierDto.address3 !== undefined && { address3: updateSupplierDto.address3 }),
      ...(updateSupplierDto.address4 !== undefined && { address4: updateSupplierDto.address4 }),
      ...(updateSupplierDto.address5 !== undefined && { address5: updateSupplierDto.address5 }),
      ...(updateSupplierDto.npwp !== undefined && { npwp: updateSupplierDto.npwp }),
      ...(updateSupplierDto.nppkp !== undefined && { nppkp: updateSupplierDto.nppkp }),
      ...(updateSupplierDto.creditLimit !== undefined && { creditLimit: updateSupplierDto.creditLimit }),
      ...(updateSupplierDto.discount !== undefined && { discount: updateSupplierDto.discount }),
      ...(updateSupplierDto.term !== undefined && { term: updateSupplierDto.term }),
      ...(updateSupplierDto.billToSame !== undefined && { billToSame: updateSupplierDto.billToSame }),
      ...(updateSupplierDto.billToName !== undefined && { billToName: updateSupplierDto.billToName }),
      ...(updateSupplierDto.billToAddress1 !== undefined && { billToAddress1: updateSupplierDto.billToAddress1 }),
      ...(updateSupplierDto.billToAddress2 !== undefined && { billToAddress2: updateSupplierDto.billToAddress2 }),
      ...(updateSupplierDto.billToAddress3 !== undefined && { billToAddress3: updateSupplierDto.billToAddress3 }),
      ...(updateSupplierDto.billToAddress4 !== undefined && { billToAddress4: updateSupplierDto.billToAddress4 }),
      ...(updateSupplierDto.createDate !== undefined && { createDate: updateSupplierDto.createDate }),
      ...(updateSupplierDto.lastDate !== undefined && { lastDate: updateSupplierDto.lastDate }),
      ...(updateSupplierDto.isSuspended !== undefined && { isSuspended: updateSupplierDto.isSuspended }),
      ...(updateSupplierDto.memo !== undefined && { memo: updateSupplierDto.memo }),
      ...(updateSupplierDto.imagePath !== undefined && { imagePath: updateSupplierDto.imagePath }),
      ...(updateSupplierDto.visitFrequency !== undefined && { visitFrequency: updateSupplierDto.visitFrequency }),
      ...(updateSupplierDto.email !== undefined && { email: updateSupplierDto.email }),
      ...(updateSupplierDto.email2 !== undefined && { email2: updateSupplierDto.email2 }),
      ...(updateSupplierDto.email3 !== undefined && { email3: updateSupplierDto.email3 }),
    };

    const updated = await this.supplierRepository.update(id, updateData);
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.supplierRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Supplier with id '${id}' not found`);
    }
    await this.supplierRepository.delete(id);
  }

  private mapToResponseDto(supplier: Supplier): SupplierResponseDto {
    return {
      id: supplier.id,
      code: supplier.code,
      name: supplier.description,
      cityId: supplier.cityId,
      address1: supplier.address1,
      address2: supplier.address2,
      address3: supplier.address3,
      address4: supplier.address4,
      address5: supplier.address5,
      npwp: supplier.npwp,
      nppkp: supplier.nppkp,
      creditLimit: supplier.creditLimit,
      discount: supplier.discount,
      term: supplier.term,
      billToSame: supplier.billToSame,
      billToName: supplier.billToName,
      billToAddress1: supplier.billToAddress1,
      billToAddress2: supplier.billToAddress2,
      billToAddress3: supplier.billToAddress3,
      billToAddress4: supplier.billToAddress4,
      createDate: supplier.createDate,
      lastDate: supplier.lastDate,
      isSuspended: supplier.isSuspended,
      memo: supplier.memo,
      imagePath: supplier.imagePath,
      visitFrequency: supplier.visitFrequency,
      email: supplier.email,
      email2: supplier.email2,
      email3: supplier.email3,
    };
  }
}

