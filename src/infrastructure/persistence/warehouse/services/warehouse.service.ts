import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { IWarehouseRepository } from '../../../../core/warehouse/repositories/warehouse.repository.interface';
import { WAREHOUSE_REPOSITORY } from '../../../../core/warehouse/repositories/repository.tokens';
import { Warehouse } from '../../../../core/warehouse/entities/warehouse.entity';
import { CreateWarehouseDto } from '../../../../presentation/warehouse/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../../../../presentation/warehouse/dto/update-warehouse.dto';
import { WarehouseResponseDto } from '../../../../presentation/warehouse/dto/warehouse-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class WarehouseService extends BaseService {
  constructor(
    @Inject(WAREHOUSE_REPOSITORY)
    private readonly warehouseRepository: IWarehouseRepository,
  ) {
    super();
  }

  async create(
    createWarehouseDto: CreateWarehouseDto,
  ): Promise<WarehouseResponseDto> {
    // Generate a backend primary key (23 chars) and ensure uniqueness.
    const id = await this.generateUniqueId(
      (id) => this.warehouseRepository.exists(id),
      'Unable to generate a unique primary key for Warehouse',
    );

    // Check if description already exists (unique constraint)
    const existsByDesc = await this.warehouseRepository.existsByDescription(
      createWarehouseDto.description,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `Warehouse with description '${createWarehouseDto.description}' already exists`,
      );
    }

    var newSerialNumber = await this.warehouseRepository.createNewSerialNumber();

    // Compose domain partial including generated primary key
    const warehousePartial: Partial<Warehouse> = {
      id,
      description: createWarehouseDto.description,
      serialNumber: newSerialNumber ?? null,
      refNo: createWarehouseDto.refNo ?? '',
      kepalaSeri: createWarehouseDto.kepalaSeri ?? '',
      option: createWarehouseDto.option ?? 0,
      cr: createWarehouseDto.cr ?? 0,
      kepalaSeri1: createWarehouseDto.kepalaSeri1 ?? '',
      kepalaSeri2: createWarehouseDto.kepalaSeri2 ?? '',
      kepalaSeri3: createWarehouseDto.kepalaSeri3 ?? '',
      kepalaSeri4: createWarehouseDto.kepalaSeri4 ?? '',
      kepalaSeri5: createWarehouseDto.kepalaSeri5 ?? '',
      refNo1: createWarehouseDto.refNo1 ?? '',
      refNo2: createWarehouseDto.refNo2 ?? '',
      refNo3: createWarehouseDto.refNo3 ?? '',
      refNo4: createWarehouseDto.refNo4 ?? '',
      refNo5: createWarehouseDto.refNo5 ?? '',
      lok1: createWarehouseDto.lok1 ?? '',
      lok2: createWarehouseDto.lok2 ?? '',
      lok3: createWarehouseDto.lok3 ?? '',
      min: createWarehouseDto.min ?? 0,
      max: createWarehouseDto.max ?? 0,
      slipat: createWarehouseDto.slipat ?? 0,
      kepalaSeri1b: createWarehouseDto.kepalaSeri1b ?? '',
      kepalaSeri1c: createWarehouseDto.kepalaSeri1c ?? '',
      refNo1b: createWarehouseDto.refNo1b ?? '',
      refNo1c: createWarehouseDto.refNo1c ?? '',
    };

    const warehouse = await this.warehouseRepository.create(warehousePartial);
    return this.mapToResponseDto(warehouse);
  }

  async findAll(): Promise<WarehouseResponseDto[]> {
    const warehouses = await this.warehouseRepository.findAll();
    return warehouses.map((warehouse) => this.mapToResponseDto(warehouse));
  }

  async findOne(id: string): Promise<WarehouseResponseDto> {
    const warehouse = await this.warehouseRepository.findOne(id);
    if (!warehouse) {
      throw new NotFoundException(
        `Warehouse with id '${id}' not found`,
      );
    }
    return this.mapToResponseDto(warehouse);
  }

  async update(
    id: string,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<WarehouseResponseDto> {
    // Check if the warehouse exists
    const exists = await this.warehouseRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `Warehouse with id '${id}' not found`,
      );
    }

    // If updating description, check for uniqueness
    if (updateWarehouseDto.description) {
      const existingByDesc =
        await this.warehouseRepository.findByDescription(updateWarehouseDto.description);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `Warehouse with description '${updateWarehouseDto.description}' already exists`,
        );
      }
    }

    // If updating primary key, check if new key already exists
    if (updateWarehouseDto.id && updateWarehouseDto.id !== id) {
      const existsNewPk = await this.warehouseRepository.exists(
        updateWarehouseDto.id,
      );
      if (existsNewPk) {
        throw new ConflictException(
          `Warehouse with id '${updateWarehouseDto.id}' already exists`,
        );
      }
    }

    // Convert DTO to domain entity format
    const updateData: Partial<Warehouse> = {
      ...(updateWarehouseDto.id && { id: updateWarehouseDto.id }),
      ...(updateWarehouseDto.description && { description: updateWarehouseDto.description }),
      ...(updateWarehouseDto.serialNumber !== undefined && { serialNumber: updateWarehouseDto.serialNumber }),
      ...(updateWarehouseDto.refNo !== undefined && { refNo: updateWarehouseDto.refNo }),
      ...(updateWarehouseDto.kepalaSeri !== undefined && { kepalaSeri: updateWarehouseDto.kepalaSeri }),
      ...(updateWarehouseDto.option !== undefined && { option: updateWarehouseDto.option }),
      ...(updateWarehouseDto.cr !== undefined && { cr: updateWarehouseDto.cr }),
      ...(updateWarehouseDto.kepalaSeri1 !== undefined && { kepalaSeri1: updateWarehouseDto.kepalaSeri1 }),
      ...(updateWarehouseDto.kepalaSeri2 !== undefined && { kepalaSeri2: updateWarehouseDto.kepalaSeri2 }),
      ...(updateWarehouseDto.kepalaSeri3 !== undefined && { kepalaSeri3: updateWarehouseDto.kepalaSeri3 }),
      ...(updateWarehouseDto.kepalaSeri4 !== undefined && { kepalaSeri4: updateWarehouseDto.kepalaSeri4 }),
      ...(updateWarehouseDto.kepalaSeri5 !== undefined && { kepalaSeri5: updateWarehouseDto.kepalaSeri5 }),
      ...(updateWarehouseDto.refNo1 !== undefined && { refNo1: updateWarehouseDto.refNo1 }),
      ...(updateWarehouseDto.refNo2 !== undefined && { refNo2: updateWarehouseDto.refNo2 }),
      ...(updateWarehouseDto.refNo3 !== undefined && { refNo3: updateWarehouseDto.refNo3 }),
      ...(updateWarehouseDto.refNo4 !== undefined && { refNo4: updateWarehouseDto.refNo4 }),
      ...(updateWarehouseDto.refNo5 !== undefined && { refNo5: updateWarehouseDto.refNo5 }),
      ...(updateWarehouseDto.lok1 !== undefined && { lok1: updateWarehouseDto.lok1 }),
      ...(updateWarehouseDto.lok2 !== undefined && { lok2: updateWarehouseDto.lok2 }),
      ...(updateWarehouseDto.lok3 !== undefined && { lok3: updateWarehouseDto.lok3 }),
      ...(updateWarehouseDto.min !== undefined && { min: updateWarehouseDto.min }),
      ...(updateWarehouseDto.max !== undefined && { max: updateWarehouseDto.max }),
      ...(updateWarehouseDto.slipat !== undefined && { slipat: updateWarehouseDto.slipat }),
      ...(updateWarehouseDto.kepalaSeri1b !== undefined && { kepalaSeri1b: updateWarehouseDto.kepalaSeri1b }),
      ...(updateWarehouseDto.kepalaSeri1c !== undefined && { kepalaSeri1c: updateWarehouseDto.kepalaSeri1c }),
      ...(updateWarehouseDto.refNo1b !== undefined && { refNo1b: updateWarehouseDto.refNo1b }),
      ...(updateWarehouseDto.refNo1c !== undefined && { refNo1c: updateWarehouseDto.refNo1c }),
    };

    const updated = await this.warehouseRepository.update(
      id,
      updateData,
    );
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.warehouseRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `Warehouse with id '${id}' not found`,
      );
    }
    await this.warehouseRepository.delete(id);
  }

  private mapToResponseDto(warehouse: Warehouse): WarehouseResponseDto {
    return {
      id: warehouse.id,
      description: warehouse.description,
      serialNumber: warehouse.serialNumber,
      refNo: warehouse.refNo,
      kepalaSeri: warehouse.kepalaSeri,
      option: warehouse.option,
      cr: warehouse.cr,
      kepalaSeri1: warehouse.kepalaSeri1,
      kepalaSeri2: warehouse.kepalaSeri2,
      kepalaSeri3: warehouse.kepalaSeri3,
      kepalaSeri4: warehouse.kepalaSeri4,
      kepalaSeri5: warehouse.kepalaSeri5,
      refNo1: warehouse.refNo1,
      refNo2: warehouse.refNo2,
      refNo3: warehouse.refNo3,
      refNo4: warehouse.refNo4,
      refNo5: warehouse.refNo5,
      lok1: warehouse.lok1,
      lok2: warehouse.lok2,
      lok3: warehouse.lok3,
      min: warehouse.min,
      max: warehouse.max,
      slipat: warehouse.slipat,
      kepalaSeri1b: warehouse.kepalaSeri1b,
      kepalaSeri1c: warehouse.kepalaSeri1c,
      refNo1b: warehouse.refNo1b,
      refNo1c: warehouse.refNo1c,
    };
  }
}

