import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { DeletePackingComponent } from './packing/delete-packing/delete-packing.component';
import { ListPackingComponent } from './packing/list-packing/list-packing.component';
import { EditPackingComponent } from './packing/edit-packing/edit-packing.component';
import { CreatePackingComponent } from './packing/create-packing/create-packing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';


@NgModule({
  declarations: [
    CreateClientComponent,
    EditClientComponent,
    ListClientComponent,
    DeleteClientComponent,
    CreateProductComponent,
    ListProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    DeletePackingComponent,
    ListPackingComponent,
    EditPackingComponent,
    CreatePackingComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    ReactiveFormsModule,
    CdkTableModule,
  ]
})
export class ParametersModule { }
