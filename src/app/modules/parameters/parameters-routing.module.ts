import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListPackingComponent } from './packing/list-packing/list-packing.component';
import { EditPackingComponent } from './packing/edit-packing/edit-packing.component';
import { DeletePackingComponent } from './packing/delete-packing/delete-packing.component';
import { CreatePackingComponent } from './packing/create-packing/create-packing.component';
import { ViewClientComponent } from './client/view-client/view-client.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { ViewPackingComponent } from './packing/view-packing/view-packing.component';

const routes: Routes = [
  {
    path: "list-client",
    component: ListClientComponent,
  },
  {
    path: "edit-client/:id",
    component: EditClientComponent,
  },
  {
    path: "delete-client",
    component: DeleteClientComponent,
  },
  {
    path: "save-client",
    component: CreateClientComponent,
  },
  {
    path: "view-client",
    component: ViewClientComponent,
  },
  {
    path: "list-product",
    component: ListProductComponent,
  },
  {
    path: "edit-product/:id",
    component: EditProductComponent,
  },
  {
    path: "delete-product",
    component: DeleteProductComponent,
  },
  {
    path: "save-product",
    component: CreateProductComponent,
  },
  {
    path: "view-product",
    component: ViewProductComponent,
  },
  {
    path: "list-packing",
    component: ListPackingComponent,
  },
  {
    path: "edit-packing/:id",
    component: EditPackingComponent,
  },
  {
    path: "delete-packing",
    component: DeletePackingComponent,
  },
  {
    path: "save-packing",
    component: CreatePackingComponent,
  },
  {
    path: "view-packing",
    component: ViewPackingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
