import { Component, OnInit } from '@angular/core';
import { UsersFacade } from 'src/app/users/state/users.facade';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsFacade } from 'src/app/products/state/products.facade';

@Component({
  selector: 'app-dashboard-home-container',
  template: `
    <app-header></app-header>

    <app-dashboard-home
      [usersChartOptions]="usersChartOptions$ | async"
      [storedNumberOfUsersToDisplay]="storedNumberOfUsersToDisplay$ | async"
      [productsChartOptions]="productsChartOptions$ | async"

      (numberOfUsersToDisplay)="numberOfUsersToDisplay($event)"
    ></app-dashboard-home>
  `
})
export class DashboardHomeContainerComponent implements OnInit {

  usersChartOptions$: Observable<Highcharts.Options>;
  storedNumberOfUsersToDisplay$: Observable<number>;
  productsChartOptions$: Observable<Highcharts.Options>;

  constructor(
    private usersFacade: UsersFacade,
    private productsFacade: ProductsFacade
  ) {
    this.storedNumberOfUsersToDisplay$ = usersFacade.numberOfUsersToDisplay$;
    this.usersChartOptions$ = combineLatest(usersFacade.users$, usersFacade.numberOfUsersToDisplay$).pipe(
      map(([users, num]) => {

        const moneySpentByUser = users.map(user => {
          return {
            name: user.name,
            y: user.totalMoneySpent
          };
        }).slice(0, num);

        return {
          chart: { type: 'column'},
          title: {text: 'Most active users'},
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

    this.productsChartOptions$ = this.productsFacade.products$.pipe(
      map(products => {

        const topSellingProducts = products
          .filter(item => item.salesCount > 0)
          .map(item => {
            return {
              name: item.name,
              y: item.salesCount
            };
          })
          .sort((a, b) => b.y - a.y);

        return {
          chart: { type: 'bar'},
          title: {text: 'Top selling products'},
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: { text: 'Total units sold' }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
          },
          tooltip: { enabled: false },
          series: [{
            colorByPoint: true,
            data: topSellingProducts
          }]
        } as Highcharts.Options;
      })
    );
  }

  ngOnInit() {
    this.usersFacade.clearUsers();
    this.usersFacade.getUsers({column: 'totalMoneySpent', direction: 'desc'});
    this.productsFacade.clearProducts();
    this.productsFacade.getProducts();
  }

  numberOfUsersToDisplay(num: number) {
    this.usersFacade.setNumberOfUsersToDisplay(num);
  }

}
