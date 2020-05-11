import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, ViewChild, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Product, Purchase, User } from 'src/app/shared/interfaces';

const cities = ['Minsk', 'Brussels', 'Prague', 'Copenhagen', 'Berlin', 'Paris', 'Budapest',
  'Dublin', 'Rome', 'Riga', 'Vilnius', 'Monaco', 'Amsterdam',
  'Warsaw', 'Bucharest', 'Moscow', 'Madrid', 'Stockholm', 'Kiev', 'Kansas', 'London'];

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
  @Output() addPurchase = new EventEmitter<{userId: string, purchase: Purchase}>();
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
      map(term => (term === '' ? cities
        : cities.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      location: new FormControl('', [Validators.required]),
    });
  }

  queryProductName(event) {
    if (event.target.value === '') {
      this.products = [];
    } else {
      this.productNameQuery.emit(event.target.value);
    }
  }

  addProduct(product) {
    this.purchasedProducts.push(product);
  }

  removeProduct(id) {
    this.purchasedProducts = this.purchasedProducts.filter(product => product.id !== id);
  }

  submit() {
    this.addPurchase.emit({
      userId: this.selectedUser.id,
      purchase: {
        date: `${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
        location: this.form.get('location').value,
        purchasedItems: this.purchasedProducts.map(product => product.id)
      }
    });
  }

  cancel() {
    this.cancelChanges.emit();
  }

}
