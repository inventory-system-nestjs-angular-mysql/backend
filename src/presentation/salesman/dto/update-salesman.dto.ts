import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesmanDto } from './create-salesman.dto';

/**
 * Presentation Layer DTO - HTTP Request DTO for updating Salesman
 */
export class UpdateSalesmanDto extends PartialType(CreateSalesmanDto) {}

