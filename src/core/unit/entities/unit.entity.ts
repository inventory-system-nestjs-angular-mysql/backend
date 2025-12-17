/**
 * Domain Entity - Pure business entity without infrastructure concerns
 */
export class Unit {
  id: string;
  description: string;
  serialNumber: string | null;
  coreTax: string | null;
}

