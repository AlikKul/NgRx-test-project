import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home-container',
  template: `
    <app-header></app-header>

    <app-dashboard-home></app-dashboard-home>
  `
})
export class DashboardHomeContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
