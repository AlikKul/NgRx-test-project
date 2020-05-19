import { Component, OnInit } from '@angular/core';
import { UsersFacade } from 'src/app/users/state/users.facade';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard-home-container',
  template: `
    <app-header></app-header>

    <app-dashboard-home
      [chartOptions]="chartOptions$ | async"

      (numberOfUsersToDisplay)="numberOfUsersToDisplay($event)"
    ></app-dashboard-home>
  `
})
export class DashboardHomeContainerComponent implements OnInit {

  chartOptions$: Observable<Highcharts.Options>;
  updateFlag$ = new Subject<boolean>();

  constructor(
    private usersFacade: UsersFacade
  ) {
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
    // this.chartOptions$ = usersFacade.users$.pipe(
    //   map(users => {
    //     const moneySpentByUser = users.map(user => {
    //       return {
    //         name: user.name,
    //         y: user.totalMoneySpent
    //       };
    //     });
    //     return {
    //       chart: { type: 'column'},
    //       title: {text: 'Total money spent'},
    //       xAxis: {
    //         type: 'category'
    //       },
    //       yAxis: {
    //         title: { text: 'Total money spent, USD' }
    //       },
    //       legend: {
    //         enabled: false
    //       },
    //       plotOptions: {
    //         series: {
    //             borderWidth: 0,
    //             dataLabels: {
    //                 enabled: true,
    //                 format: '{point.y} USD'
    //             }
    //         }
    //       },
    //       tooltip: { enabled: false },
    //       series: [{
    //         colorByPoint: true,
    //         data: moneySpentByUser
    //       }]
    //     } as Highcharts.Options;
    //   })
    // );
  }

  ngOnInit() {
    this.usersFacade.clearUsers();
    this.usersFacade.getUsers({column: 'totalMoneySpent', direction: 'desc'});
  }

  numberOfUsersToDisplay(num: number) {
    this.usersFacade.setNumberOfUsersToDisplay(num);
  }

}
