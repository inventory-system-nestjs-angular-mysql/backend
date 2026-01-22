import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsString()
  @IsOptional()
  @Length(1, 23)
  id?: string;
}

