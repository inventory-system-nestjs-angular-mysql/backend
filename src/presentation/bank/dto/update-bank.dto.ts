import { PartialType } from '@nestjs/mapped-types';
import { CreateBankDto } from './create-bank.dto';
import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class UpdateBankDto extends PartialType(CreateBankDto) {
  @IsString()
  @IsOptional()
  @Length(1, 23)
  id?: string;
}

