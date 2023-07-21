import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { CreateSaleComponent } from './sale/create-sale/create-sale.component';
import { EditSaleComponent } from './sale/edit-sale/edit-sale.component';
import { ListSaleComponent } from './sale/list-sale/list-sale.component';
import { DeleteSaleComponent } from './sale/delete-sale/delete-sale.component';
import { CreateBillComponent } from './bill/create-bill/create-bill.component';
import { EditBillComponent } from './bill/edit-bill/edit-bill.component';
import { ListBillComponent } from './bill/list-bill/list-bill.component';
import { DeleteBillComponent } from './bill/delete-bill/delete-bill.component';
import { CreateRemissionComponent } from './remission/create-remission/create-remission.component';
import { ListRemissionComponent } from './remission/list-remission/list-remission.component';
import { EditRemissionComponent } from './remission/edit-remission/edit-remission.component';
import { DeleteRemissionComponent } from './remission/delete-remission/delete-remission.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from '@angular/cdk/dialog';
import { ViewBillComponent } from './bill/view-bill/view-bill.component';
import { ViewRemissionComponent } from './remission/view-remission/view-remission.component';
import { ViewSaleComponent } from './sale/view-sale/view-sale.component';


@NgModule({
  declarations: [
    CreateSaleComponent,
    EditSaleComponent,
    ListSaleComponent,
    DeleteSaleComponent,
    CreateBillComponent,
    EditBillComponent,
    ListBillComponent,
    DeleteBillComponent,
    CreateRemissionComponent,
    ListRemissionComponent,
    EditRemissionComponent,
    DeleteRemissionComponent,
    ViewBillComponent,
    ViewRemissionComponent,
    ViewSaleComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    CdkTableModule,
    FontAwesomeModule,
    DialogModule,
  ]
})
export class SalesModule { }
