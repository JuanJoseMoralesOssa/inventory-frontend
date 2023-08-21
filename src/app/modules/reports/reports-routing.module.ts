import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyDeliveryComponent } from './daily-delivery/daily-delivery.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: "",
    component: DailyDeliveryComponent,
  },
  {
    path: "daily-delivery",
    component: DailyDeliveryComponent,
    // outlet: "statisticsDetails"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
