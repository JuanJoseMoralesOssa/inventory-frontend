import { SaleModel } from "./sale.model";

export interface BillModel {
  id?: number;
  bill?: number;
  sale?: SaleModel;
  remission?: number;
}
