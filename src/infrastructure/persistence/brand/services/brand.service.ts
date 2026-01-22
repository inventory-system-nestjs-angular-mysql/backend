import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { IBrandRepository } from '../../../../core/brand/repositories/brand.repository.interface';
import { BRAND_REPOSITORY } from '../../../../core/brand/repositories/repository.tokens';
import { Brand } from '../../../../core/brand/entities/brand.entity';
import { CreateBrandDto } from '../../../../presentation/brand/dto/create-brand.dto';
import { UpdateBrandDto } from '../../../../presentation/brand/dto/update-brand.dto';
import { BrandResponseDto } from '../../../../presentation/brand/dto/brand-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class BrandService extends BaseService {
  constructor(
    @Inject(BRAND_REPOSITORY)
    private readonly brandRepository: IBrandRepository,
  ) {
    super();
  }

  async create(
    createBrandDto: CreateBrandDto,
  ): Promise<BrandResponseDto> {
    // Generate a backend primary key (23 chars) and ensure uniqueness.
    const id = await this.generateUniqueId(
      (id) => this.brandRepository.exists(id),
      'Unable to generate a unique primary key for Brand',
    );

    // Check if description already exists
    const existsByDesc = await this.brandRepository.existsByDescription(
      createBrandDto.description,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `Brand with description '${createBrandDto.description}' already exists`,
      );
    }

    var newSerialNumber = await this.brandRepository.createNewSerialNumber();

    // Compose domain partial including generated primary key
    const brandPartial: Partial<Brand> = {
      id,
      description: createBrandDto.description,
      serialNumber: newSerialNumber ?? null,
    };

    const brand = await this.brandRepository.create(brandPartial);
    return this.mapToResponseDto(brand);
  }

  async findAll(): Promise<BrandResponseDto[]> {
    const brands = await this.brandRepository.findAll();
    return brands.map((brand) => this.mapToResponseDto(brand));
  }

  async findOne(id: string): Promise<BrandResponseDto> {
    const brand = await this.brandRepository.findOne(id);
    if (!brand) {
      throw new NotFoundException(
        `Brand with id '${id}' not found`,
      );
    }
    return this.mapToResponseDto(brand);
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    // Check if the brand exists
    const exists = await this.brandRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `Brand with id '${id}' not found`,
      );
    }

    // If updating description, check for uniqueness
    if (updateBrandDto.description) {
      const existingByDesc =
        await this.brandRepository.findByDescription(updateBrandDto.description);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `Brand with description '${updateBrandDto.description}' already exists`,
        );
      }
    }

    // If updating primary key, check if new key already exists
    if (updateBrandDto.id && updateBrandDto.id !== id) {
      const existsNewPk = await this.brandRepository.exists(
        updateBrandDto.id,
      );
      if (existsNewPk) {
        throw new ConflictException(
          `Brand with id '${updateBrandDto.id}' already exists`,
        );
      }
    }

    // Convert DTO to domain entity format
    const updateData: Partial<Brand> = {
      ...(updateBrandDto.id && { id: updateBrandDto.id }),
      ...(updateBrandDto.description && { description: updateBrandDto.description }),
      ...(updateBrandDto.serialNumber !== undefined && { serialNumber: updateBrandDto.serialNumber }),
    };

    const updated = await this.brandRepository.update(
      id,
      updateData,
    );
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.brandRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `Brand with id '${id}' not found`,
      );
    }
    await this.brandRepository.delete(id);
  }

  private mapToResponseDto(brand: Brand): BrandResponseDto {
    return {
      id: brand.id,
      description: brand.description,
      serialNumber: brand.serialNumber,
    };
  }
}

