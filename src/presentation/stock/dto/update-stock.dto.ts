import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';
import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO for updating Stock
 */
export class UpdateStockDto extends PartialType(CreateStockDto) {
  @IsString()
  @IsOptional()
  @Length(1, 23)
  id?: string;
}

