import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/components/home/home.component';
import { PathNotFoundComponent } from './public/components/errors/path-not-found/path-not-found.component';

const routes: Routes = [
  {
  path: "home",
  component: HomeComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "security",
    loadChildren: () => import("./modules/security/security.module").then(m => m.SecurityModule)
  },
  {
    path: "parameters",
    loadChildren: () => import("./modules/parameters/parameters.module").then(m => m.ParametersModule)
  },
  {
    path: "reports",
    loadChildren: () => import("./modules/reports/reports.module").then(m => m.ReportsModule)
  },
  {
    path: "sales",
    loadChildren: () => import("./modules/sales/sales.module").then(m => m.SalesModule)
  },
  {
    path: "**",
    component: PathNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
