import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';

/**
 * Presentation Layer DTO - HTTP Request DTO for updating Supplier
 */
export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}

