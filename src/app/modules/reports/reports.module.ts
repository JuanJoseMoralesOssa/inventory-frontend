import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { DailyDeliveryComponent } from './daily-delivery/daily-delivery.component';
import { FormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics/statistics.component';


@NgModule({
  declarations: [
    DailyDeliveryComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule
  ]
})
export class ReportsModule { }
