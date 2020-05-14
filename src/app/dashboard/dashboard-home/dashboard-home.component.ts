import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {
    chart: { type: 'column'},
    title: {text: 'Total turnover'},
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: { text: 'Total turnover, USD' }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
              format: '{point.y} USD'
          }
      }
    },
    tooltip: { enabled: false },
    series: [{
      colorByPoint: true,
      data: [
        {
          name: 'NewEgg',
          y: 15000
        },
        {
          name: 'Amazon',
          y: 12000
        },
        {
          name: 'Tesco',
          y: 35550
        },
        {
          name: 'ShopDirect',
          y: 4500
        },
        {
          name: 'Walmart',
          y: 81900
        },
        {
          name: 'BestBuy',
          y: 64230
        },
        {
          name: 'AliExpress',
          y: 129800
        },
        {
          name: 'Ebay',
          y: 109300
        }
      ]
    }]
  } as Highcharts.Options;

  constructor() { }

  ngOnInit() {
  }

}
