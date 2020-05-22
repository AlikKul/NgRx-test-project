import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Purchase, User, PurchaseDetailsQuery, Product } from 'src/app/shared/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.scss']
})
export class UserPurchasesComponent implements OnInit {

  @Input() alert: string;
  @Input() purchases: Purchase[];
  @Input() selectedUser: User;
  @Input() purchasedProducts: Product[];
  @Output() showPurchaseDetails = new EventEmitter<PurchaseDetailsQuery>();
  @Output() addNewPurchase = new EventEmitter<void>();
  @Output() navBack = new EventEmitter<void>();

  date: string;
  location: string;

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  onAddNewPurchase() {
    this.addNewPurchase.emit();
  }

  back() {
    this.navBack.emit();
  }

  onShowPurchaseDetails(content, purchase: Purchase) {
    this.showPurchaseDetails.emit({
      userId: this.selectedUser.id,
      purchaseId: purchase.id
    });
    this.date = purchase.date;
    this.location = purchase.location;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
