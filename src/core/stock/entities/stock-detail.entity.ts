/**
 * Domain Entity - Pure business entity without infrastructure concerns
 */
export class StockDetail {
  id: string;
  stockId: string;
  unitId: string;
  conversionFactor: number | null;
  price: number | null;
  retailPrice: number | null;
  priceDollar: number | null;
  price1: number | null;
  price2: number | null;
  price3: number | null;
  code: string;
  validFrom: Date | null;
  validTo: Date | null;
  discount: number | null;
  discountPercentage: number | null;
  serialNumber: string | null;
  originalPrice: number | null;
  originalPriceDollar: number | null;
  originalPrice1: number | null;
  originalPrice2: number | null;
  originalPrice3: number | null;
  originalRetailPrice: number | null;
  key: number | null;
  vendorDiscount: number | null;
  vendorDiscountPercentage: number | null;
  validFrom1: Date | null;
  validTo1: Date | null;
  discountPercentage1: number | null;
  discount1: number | null;
  vendorDiscountPercentage1: number | null;
  vendorDiscount1: number | null;
  promoCode1: string | null;
  outlet01: number | null;
  outlet02: number | null;
  outlet03: number | null;
  outlet04: number | null;
  outlet05: number | null;
  outlet06: number | null;
  outlet07: number | null;
  outlet08: number | null;
  outlet09: number | null;
  outlet10: number | null;
  newPrice: number;
  newPriceDate: Date | null;
  editDate: Date | null;
  editedBy: string | null;
  minimumPrice: number;
  maximumPrice: number;
  outlet11: number;
  outlet12: number;
  outlet13: number;
  outlet14: number;
  outlet15: number;
  outlet16: number;
  outlet17: number;
  outlet18: number;
  outlet19: number;
  outlet20: number;
  markup: number;
  fee: number;
  internalCode: string | null;
  unit: string | null;
}

