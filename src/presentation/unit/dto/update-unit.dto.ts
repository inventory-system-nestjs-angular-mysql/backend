import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitDto } from './create-unit.dto';
import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class UpdateUnitDto extends PartialType(CreateUnitDto) {
  @IsString()
  @IsOptional()
  @Length(1, 23)
  id?: string;
}

