import { SaleModel } from "./sale.model";

export interface ProductModel {
  id?: number;
  code?: string;
  productName?: string;
  totalQuantity?: number;
  totalWeight?: number;
  sales?: SaleModel[];
  packingId?: number;
}
