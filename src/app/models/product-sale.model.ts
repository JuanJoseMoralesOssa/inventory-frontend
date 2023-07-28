import { ProductModel } from "./product.model";
import { SaleModel } from "./sale.model";

export interface ProductSaleModel {
  id?: number;
  saleId?: number;
  sale?: SaleModel;
  productId?: number;
  product?: ProductModel;
  quantity?: number;
  weight?: number;
  IsBorrowed?: boolean;
}
