import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';
import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO for updating Stock
 */

import { UpdateStockDetailDto } from './update-stock-detail.dto';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';

export class UpdateStockDto extends PartialType(OmitType(CreateStockDto, ['stockDetails'] as const),) {
  @IsString()
  @IsOptional()
  @Length(1, 23)
  id?: string;

  // Override stockDetails to use UpdateStockDetailDto[]
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateStockDetailDto)
  stockDetails?: UpdateStockDetailDto[];
}

