import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Purchase, User, PurchaseDetailsQuery, Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.scss']
})
export class UserPurchasesComponent implements OnInit {

  @Input() purchases: Purchase[];
  @Input() selectedUser: User;
  @Input() purchasedProducts: Product[];
  @Output() showPurchaseDitails = new EventEmitter<PurchaseDetailsQuery>();
  @Output() navBack = new EventEmitter<void>();

  date: string;
  location: string;

  constructor() { }

  ngOnInit() {
  }

  back() {
    this.navBack.emit();
  }

  purchaseDetails(purchase: Purchase) {
    this.showPurchaseDitails.emit({
      userId: this.selectedUser.id,
      purchaseId: purchase.id
    });
    this.date = purchase.date;
    this.location = purchase.location;
  }

}