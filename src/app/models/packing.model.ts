import { ProductModel } from "./product.model";

export interface PackingModel {
  id?: number;
  packing?: string;
  products?: ProductModel[];
}
