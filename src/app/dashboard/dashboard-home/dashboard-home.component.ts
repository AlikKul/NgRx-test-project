import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent implements OnInit {

  @Input() chartOptions: Highcharts.Options;

  Highcharts = Highcharts;

  constructor() { }

  ngOnInit() {}

}
