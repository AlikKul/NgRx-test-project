import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[];
  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProductId = new EventEmitter<string>();
  @Output() initializeNewProduct = new EventEmitter<void>();

  name: string;
  id: string;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  addProduct() {
    this.initializeNewProduct.emit();
  }

  edit(product) {
    this.editProduct.emit(product);
  }

  showDeleteModal(content, product: Product) {
    this.modalService.open(content, { centered: true });
    this.name = product.name;
    this.id = product.id;
  }

  deleteConfirmed() {
    this.deleteProductId.emit(this.id);
    this.modalService.dismissAll();
  }

  deleteCanceled() {
    this.modalService.dismissAll();
  }

}
