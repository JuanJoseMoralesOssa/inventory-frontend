import { ProductSaleModel } from "./product-sale.model";
import { SaleModel } from "./sale.model";

export interface ProductModel {
  id?: number;
  code?: string;
  productName?: string;
  totalWeight?: number;
  sales?: SaleModel[];
  productSales?: ProductSaleModel[];
}
