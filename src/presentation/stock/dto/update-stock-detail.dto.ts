import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDetailDto } from './create-stock-detail.dto';
import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO for updating StockDetail
 */
export class UpdateStockDetailDto extends PartialType(CreateStockDetailDto) {
  @IsString()
  @IsOptional()
  @Length(1, 23)
  id?: string;
}

