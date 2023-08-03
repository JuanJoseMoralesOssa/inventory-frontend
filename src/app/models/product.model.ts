import { PackingModel } from "./packing.model";
import { ProductSaleModel } from "./product-sale.model";
import { SaleModel } from "./sale.model";

export interface ProductModel {
  id?: number;
  code?: string;
  productName?: string;
  totalQuantity?: number;
  totalWeight?: number;
  sales?: SaleModel[];
  packingId?: number;
  packing?: PackingModel;
  productSales?: ProductSaleModel[];
}
