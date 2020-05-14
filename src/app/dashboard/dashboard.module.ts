import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardHomeContainerComponent } from './dashboard-home/dashboard-home-container.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HighchartsChartModule
  ],
  declarations: [
    DashboardHomeComponent,
    DashboardHomeContainerComponent
  ]
})

export class DashboardModule {}
