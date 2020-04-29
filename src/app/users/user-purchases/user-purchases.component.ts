import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.scss']
})
export class UserPurchasesComponent implements OnInit {

  @Input() purchases;

  constructor() { }

  ngOnInit() {
  }

}
