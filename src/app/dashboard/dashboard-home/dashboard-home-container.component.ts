import { Component, OnInit } from '@angular/core';
import { UsersFacade } from 'src/app/users/state/users.facade';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-home-container',
  template: `
    <app-header></app-header>

    <app-dashboard-home
      [chartOptions]="chartOptions$ | async"
      [storedNumberOfUsersToDisplay]="storedNumberOfUsersToDisplay$ | async"

      (numberOfUsersToDisplay)="numberOfUsersToDisplay($event)"
    ></app-dashboard-home>
  `
})
export class DashboardHomeContainerComponent implements OnInit {

  chartOptions$: Observable<Highcharts.Options>;
  storedNumberOfUsersToDisplay$: Observable<number>;

  constructor(
    private usersFacade: UsersFacade
  ) {
    this.storedNumberOfUsersToDisplay$ = usersFacade.numberOfUsersToDisplay$;
    this.chartOptions$ = combineLatest(usersFacade.users$, usersFacade.numberOfUsersToDisplay$).pipe(
      map(([users, num]) => {

        const moneySpentByUser = users.map(user => {
          return {
            name: user.name,
            y: user.totalMoneySpent
          };
        }).slice(0, num);

        return {
          chart: { type: 'column'},
          title: {text: 'Total money spent'},
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: { text: 'Total money spent, USD' }
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
            data: moneySpentByUser
          }]
        } as Highcharts.Options;
      })
    );
  }

  ngOnInit() {
    this.usersFacade.clearUsers();
    this.usersFacade.getUsers({column: 'totalMoneySpent', direction: 'desc'});
  }

  numberOfUsersToDisplay(num: number) {
    this.usersFacade.setNumberOfUsersToDisplay(num);
  }

}
