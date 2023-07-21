import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSaleComponent } from './sale/list-sale/list-sale.component';
import { EditSaleComponent } from './sale/edit-sale/edit-sale.component';
import { DeleteSaleComponent } from './sale/delete-sale/delete-sale.component';
import { CreateSaleComponent } from './sale/create-sale/create-sale.component';
import { CreateRemissionComponent } from './remission/create-remission/create-remission.component';
import { DeleteRemissionComponent } from './remission/delete-remission/delete-remission.component';
import { EditRemissionComponent } from './remission/edit-remission/edit-remission.component';
import { ListRemissionComponent } from './remission/list-remission/list-remission.component';
import { EditBillComponent } from './bill/edit-bill/edit-bill.component';
import { ListBillComponent } from './bill/list-bill/list-bill.component';
import { CreateBillComponent } from './bill/create-bill/create-bill.component';
import { DeleteBillComponent } from './bill/delete-bill/delete-bill.component';
import { ViewSaleComponent } from './sale/view-sale/view-sale.component';
import { ViewRemissionComponent } from './remission/view-remission/view-remission.component';
import { ViewBillComponent } from './bill/view-bill/view-bill.component';

const routes: Routes = [
  {
    path: "list-sale",
    component: ListSaleComponent,
  },
  {
    path: "edit-sale/:id",
    component: EditSaleComponent,
  },
  {
    path: "delete-sale",
    component: DeleteSaleComponent,
  },
  {
    path: "save-sale",
    component: CreateSaleComponent,
  },
  {
    path: "view-sale",
    component: ViewSaleComponent,
  },
  {
    path: "list-remission",
    component: ListRemissionComponent,
  },
  {
    path: "edit-remission/:id",
    component: EditRemissionComponent,
  },
  {
    path: "delete-remission",
    component: DeleteRemissionComponent,
  },
  {
    path: "save-remission",
    component: CreateRemissionComponent,
  },
  {
    path: "view-remission",
    component: ViewRemissionComponent,
  },
  {
    path: "list-bill",
    component: ListBillComponent,
  },
  {
    path: "edit-bill/:id",
    component: EditBillComponent,
  },
  {
    path: "delete-bill",
    component: DeleteBillComponent,
  },
  {
    path: "save-bill",
    component: CreateBillComponent,
  },
  {
    path: "view-bill",
    component: ViewBillComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
