import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, ViewChild, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Product, Purchase, User } from 'src/app/shared/interfaces';

const shops = ['NewEgg', 'Amazon', 'Tesco', 'ShopDirect', 'Walmart', 'BestBuy', 'AliExpress', 'Ebay'];

@Component({
  selector: 'app-user-add-purchase',
  templateUrl: './user-add-purchase.component.html',
  styleUrls: ['./user-add-purchase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddPurchaseComponent implements OnInit {

  form: FormGroup;
  purchasedProducts: Product[] = [];

  @Input() products: Product[] = [];
  @Input() error: string;
  @Input() selectedUser: User;
  @Output() addPurchase = new EventEmitter<{
    userId: string,
    purchase: Purchase,
    totalMoneySpent: number}>();
  @Output() productNameQuery = new EventEmitter<string>();
  @Output() cancelChanges = new EventEmitter<void>();

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? shops
        : shops.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      location: new FormControl('', [Validators.required]),
      name: new FormControl('')
    });
  }

  queryProductName(name) {
    if (name === '') {
      this.products = [];
    } else {
      this.productNameQuery.emit((name).toString()[0].toUpperCase() + (name).toString().slice(1));
    }
  }

  addProduct(product) {
    this.purchasedProducts.push(product);
    this.form.get('name').setValue('');
    this.products = [];
  }

  removeProduct(id) {
    this.purchasedProducts = this.purchasedProducts.filter(product => product.id !== id);
  }

  submit() {
    this.addPurchase.emit({
      userId: this.selectedUser.id,
      purchase: {
        date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
        location: this.form.get('location').value,
        purchasedItems: this.purchasedProducts.map(product => product.id)
      },
      totalMoneySpent: this.selectedUser.totalMoneySpent + this.purchasedProducts.reduce((sum, current) => (sum + current.price), 0)
    });
  }

  cancel() {
    this.cancelChanges.emit();
  }

}
