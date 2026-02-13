import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { ICityRepository } from '../../../../core/city/repositories/city.repository.interface';
import { CITY_REPOSITORY } from '../../../../core/city/repositories/repository.tokens';
import { City } from '../../../../core/city/entities/city.entity';
import { CreateCityDto } from '../../../../presentation/city/dto/create-city.dto';
import { UpdateCityDto } from '../../../../presentation/city/dto/update-city.dto';
import { CityResponseDto } from '../../../../presentation/city/dto/city-response.dto';
import { BaseService } from '../../../../core/services/base.service';
import { CUSTOMER_REPOSITORY, ICustomerRepository } from 'src/core/customer';
import { ISupplierRepository, SUPPLIER_REPOSITORY } from 'src/core/supplier';

@Injectable()
export class CityService extends BaseService {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly cityRepository: ICityRepository,
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplierRepository: ISupplierRepository,
  ) {
    super();
  }

  async create(
    createCityDto: CreateCityDto,
  ): Promise<CityResponseDto> {
    // Generate a backend primary key (23 chars) and ensure uniqueness.
    const id = await this.generateUniqueId(
      (id) => this.cityRepository.exists(id),
      'Unable to generate a unique primary key for City',
    );

    // Check if description already exists (unique constraint)
    const existsByDesc = await this.cityRepository.existsByDescription(
      createCityDto.description,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `City with description '${createCityDto.description}' already exists`,
      );
    }

    var newSerialNumber = await this.cityRepository.createNewSerialNumber();

    // Compose domain partial including generated primary key
    const cityPartial: Partial<City> = {
      id,
      description: createCityDto.description,
      serialNumber: newSerialNumber ?? null,
    };

    const city = await this.cityRepository.create(cityPartial);
    return this.mapToResponseDto(city);
  }

  async findAll(): Promise<CityResponseDto[]> {
    const cities = await this.cityRepository.findAll();
    return cities.map((city) => this.mapToResponseDto(city));
  }

  async findOne(id: string): Promise<CityResponseDto> {
    const city = await this.cityRepository.findOne(id);
    if (!city) {
      throw new NotFoundException(
        `City with id '${id}' not found`,
      );
    }
    return this.mapToResponseDto(city);
  }

  async update(
    id: string,
    updateCityDto: UpdateCityDto,
  ): Promise<CityResponseDto> {
    // Check if the city exists
    const exists = await this.cityRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `City with id '${id}' not found`,
      );
    }

    // If updating description, check for uniqueness
    if (updateCityDto.description) {
      const existingByDesc =
        await this.cityRepository.findByDescription(updateCityDto.description);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `City with description '${updateCityDto.description}' already exists`,
        );
      }
    }

    // If updating primary key, check if new key already exists
    if (updateCityDto.id && updateCityDto.id !== id) {
      const existsNewPk = await this.cityRepository.exists(
        updateCityDto.id,
      );
      if (existsNewPk) {
        throw new ConflictException(
          `City with id '${updateCityDto.id}' already exists`,
        );
      }
    }

    // Convert DTO to domain entity format
    const updateData: Partial<City> = {
      ...(updateCityDto.id && { id: updateCityDto.id }),
      ...(updateCityDto.description && { description: updateCityDto.description }),
      ...(updateCityDto.serialNumber !== undefined && { serialNumber: updateCityDto.serialNumber }),
    };

    const updated = await this.cityRepository.update(
      id,
      updateData,
    );
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.cityRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `City with id '${id}' not found`,
      );
    }

    // // Check if any Customer records reference this City
    // const customerRepo = this.customerRepository ?? (await import('../../customer/repositories/customer.repository')).CustomerRepository;
    // const supplierRepo = this.supplierRepository ?? (await import('../../supplier/repositories/supplier.repository')).SupplierRepository;

    // // Count customers referencing this city
    // const customerCount = await customerRepo.countByCityId ? await customerRepo.countByCityId(id) : await customerRepo.repository.count({ where: { cENTfkCIT: id, nENTcust: 1 } });
    // // Count suppliers referencing this city
    // const supplierCount = await supplierRepo.countByCityId ? await supplierRepo.countByCityId(id) : await supplierRepo.repository.count({ where: { cENTfkCIT: id, nENTsupp: 1 } });
    const customerCount = await this.customerRepository.countByCityId(id);
    const supplierCount = await this.supplierRepository.countByCityId(id);
    if (customerCount > 0 || supplierCount > 0) {
      throw new BadRequestException(
        `Cannot delete City because it is referenced by ${customerCount} customer(s) and ${supplierCount} supplier(s). Please remove or reassign those records first.`
      );
    }

    await this.cityRepository.delete(id);
  }

  private mapToResponseDto(city: City): CityResponseDto {
    return {
      id: city.id,
      description: city.description,
      serialNumber: city.serialNumber,
    };
  }
}

