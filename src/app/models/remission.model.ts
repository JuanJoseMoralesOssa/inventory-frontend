import { SaleModel } from "./sale.model";

export interface RemissionModel {
  id?: number;
  remission?: number;
  sale: SaleModel;
}
