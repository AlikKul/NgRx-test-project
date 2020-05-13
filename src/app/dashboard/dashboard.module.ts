import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module'
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardHomeContainerComponent } from './dashboard-home/dashboard-home-container.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [DashboardHomeComponent, DashboardHomeContainerComponent]
})

export class DashboardModule {}
