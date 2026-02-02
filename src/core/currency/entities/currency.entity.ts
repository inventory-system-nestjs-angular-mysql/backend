/**
 * Domain Entity - Pure business entity without infrastructure concerns
 */
export class Currency {
  id: string; // cEXCpk
  currency: string; // cEXCdesc - Currency code/description
  rate: number; // nEXCvalue - Exchange rate
  taxRate: number; // nEXCtaxvalue - Tax rate
  serialNumber: string | null; // serino
}

