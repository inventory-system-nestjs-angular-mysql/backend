import { PartialType } from '@nestjs/mapped-types';
import { CreateStockGroupDto } from './create-stockgroup.dto';
import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class UpdateStockGroupDto extends PartialType(CreateStockGroupDto) {
  @IsString()
  @IsOptional()
  @Length(1, 23)
  id?: string;
}

