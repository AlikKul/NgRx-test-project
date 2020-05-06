import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  @Input() editProduct: Product;
  @Input() error: string;
  @Output() addNewProduct = new EventEmitter<Product>();
  @Output() updateProduct = new EventEmitter<Product>();
  @Output() cancelChanges = new EventEmitter<void>();

  minProductNameLength = 5;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(this.minProductNameLength)]),
      description: new FormControl(''),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')])
    });
    if (!this.editProduct && this.editProduct !== null) {
      this.router.navigate(['product-list']);
      return;
    }
    if (this.editProduct !== null) {
      this.form.patchValue(this.editProduct);
    }
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get price() {
    return this.form.get('price');
  }

  submit() {
    if (!this.editProduct.id) {
      this.addNewProduct.emit(this.form.value);
      return;
    }
    this.updateProduct.emit({
      ...this.form.value,
      id: this.editProduct.id
    });
  }

  cancel() {
    this.cancelChanges.emit();
  }

}
