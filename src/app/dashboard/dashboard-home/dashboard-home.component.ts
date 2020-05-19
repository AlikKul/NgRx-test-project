import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent implements OnInit {

  @Input() chartOptions: Highcharts.Options;
  @Output() numberOfUsersToDisplay = new EventEmitter<number>();

  Highcharts = Highcharts;
  num = 5;

  constructor() { }

  ngOnInit() {}

  usersToDisplay(num) {
    this.num = num;
    this.numberOfUsersToDisplay.emit(num);
  }

}
