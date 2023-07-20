import { BillModel } from "./bill.model";
import { ClientModel } from "./client.model";
import { ProductModel } from "./product.model";
import { RemissionModel } from "./remission.model";

export interface SaleModel {
  id?: number;
  saleDate?: string;
  remission?: number;
  clientId?: number;
  products?: ProductModel[];
  billId?: number;
  remissionId?: number;
  client?: ClientModel;
  bill?: BillModel;
}
