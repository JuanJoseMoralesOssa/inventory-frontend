import { BillModel } from "./bill.model";
import { ClientModel } from "./client.model";
import { ProductModel } from "./product.model";
import { RemissionModel } from "./remission.model";

export interface SaleModel {
  id?: number;
  saleDate?: Date;
  remissionNumId?: number;
  remissionNumModel?: RemissionModel;
  clientId?: number;
  client?: ClientModel;
  products?: ProductModel[];
  billId?: number;
  bill?: BillModel;
  remissionId?: number;
  remission?: RemissionModel;
}
