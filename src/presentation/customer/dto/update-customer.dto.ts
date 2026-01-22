import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

/**
 * Presentation Layer DTO - HTTP Request DTO for updating Customer
 */
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

