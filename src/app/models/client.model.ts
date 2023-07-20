import { SaleModel } from "./sale.model";

export interface ClientModel {
  id?: number;
  clientName?: string;
  sales?: SaleModel[];
}
