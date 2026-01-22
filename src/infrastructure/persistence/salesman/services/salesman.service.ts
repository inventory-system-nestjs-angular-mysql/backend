import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { ISalesmanRepository } from '../../../../core/salesman/repositories/salesman.repository.interface';
import { SALESMAN_REPOSITORY } from '../../../../core/salesman/repositories/repository.tokens';
import { Salesman } from '../../../../core/salesman/entities/salesman.entity';
import { CreateSalesmanDto } from '../../../../presentation/salesman/dto/create-salesman.dto';
import { UpdateSalesmanDto } from '../../../../presentation/salesman/dto/update-salesman.dto';
import { SalesmanResponseDto } from '../../../../presentation/salesman/dto/salesman-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class SalesmanService extends BaseService {
  constructor(
    @Inject(SALESMAN_REPOSITORY)
    private readonly salesmanRepository: ISalesmanRepository,
  ) {
    super();
  }

  async create(
    createSalesmanDto: CreateSalesmanDto,
  ): Promise<SalesmanResponseDto> {
    const id = await this.generateUniqueId(
      (id) => this.salesmanRepository.exists(id),
      'Unable to generate a unique primary key for Salesman',
    );

    const existsByDesc = await this.salesmanRepository.existsByDescription(
      createSalesmanDto.name,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `Salesman with name '${createSalesmanDto.name}' already exists`,
      );
    }

    const salesmanPartial: Partial<Salesman> = {
      id,
      description: createSalesmanDto.name,
      address1: createSalesmanDto.address1 ?? null,
      address2: createSalesmanDto.address2 ?? null,
      address3: createSalesmanDto.address3 ?? null,
      lastDate: createSalesmanDto.lastDate ?? null,
      commission: createSalesmanDto.commission ?? null,
      isSuspended: createSalesmanDto.isSuspended ?? false,
      memo: createSalesmanDto.memo ?? null,
      imagePath: createSalesmanDto.imagePath ?? null,
      special: createSalesmanDto.special ?? null,
    };

    const salesman = await this.salesmanRepository.create(salesmanPartial);
    return this.mapToResponseDto(salesman);
  }

  async findAll(): Promise<SalesmanResponseDto[]> {
    const salesmen = await this.salesmanRepository.findAll();
    return salesmen.map((salesman) => this.mapToResponseDto(salesman));
  }

  async findOne(id: string): Promise<SalesmanResponseDto> {
    const salesman = await this.salesmanRepository.findOne(id);
    if (!salesman) {
      throw new NotFoundException(`Salesman with id '${id}' not found`);
    }
    return this.mapToResponseDto(salesman);
  }

  async update(
    id: string,
    updateSalesmanDto: UpdateSalesmanDto,
  ): Promise<SalesmanResponseDto> {
    const exists = await this.salesmanRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Salesman with id '${id}' not found`);
    }

    if (updateSalesmanDto.name) {
      const existingByDesc = await this.salesmanRepository.findByDescription(updateSalesmanDto.name);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `Salesman with name '${updateSalesmanDto.name}' already exists`,
        );
      }
    }

    const updateData: Partial<Salesman> = {
      ...(updateSalesmanDto.name !== undefined && { description: updateSalesmanDto.name }),
      ...(updateSalesmanDto.address1 !== undefined && { address1: updateSalesmanDto.address1 }),
      ...(updateSalesmanDto.address2 !== undefined && { address2: updateSalesmanDto.address2 }),
      ...(updateSalesmanDto.address3 !== undefined && { address3: updateSalesmanDto.address3 }),
      ...(updateSalesmanDto.lastDate !== undefined && { lastDate: updateSalesmanDto.lastDate }),
      ...(updateSalesmanDto.commission !== undefined && { commission: updateSalesmanDto.commission }),
      ...(updateSalesmanDto.isSuspended !== undefined && { isSuspended: updateSalesmanDto.isSuspended }),
      ...(updateSalesmanDto.memo !== undefined && { memo: updateSalesmanDto.memo }),
      ...(updateSalesmanDto.imagePath !== undefined && { imagePath: updateSalesmanDto.imagePath }),
      ...(updateSalesmanDto.special !== undefined && { special: updateSalesmanDto.special }),
    };

    const updated = await this.salesmanRepository.update(id, updateData);
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.salesmanRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Salesman with id '${id}' not found`);
    }
    await this.salesmanRepository.delete(id);
  }

  private mapToResponseDto(salesman: Salesman): SalesmanResponseDto {
    return {
      id: salesman.id,
      name: salesman.description,
      address1: salesman.address1,
      address2: salesman.address2,
      address3: salesman.address3,
      lastDate: salesman.lastDate,
      commission: salesman.commission,
      isSuspended: salesman.isSuspended,
      memo: salesman.memo,
      imagePath: salesman.imagePath,
      special: salesman.special,
    };
  }
}

