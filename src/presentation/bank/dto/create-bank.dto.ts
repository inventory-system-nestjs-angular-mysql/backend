import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Length,
} from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class CreateBankDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  description: string;

  @IsString()
  @IsOptional()
  @Length(0, 23)
  gl?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  account?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  serialNumber?: string | null;
}

