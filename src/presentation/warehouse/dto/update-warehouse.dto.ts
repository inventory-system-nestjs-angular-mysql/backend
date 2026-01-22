import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
  @IsString()
  @IsOptional()
  @Length(1, 23)
  id?: string;
}

