import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, Directive, ViewChildren, QueryList } from '@angular/core';
import { Product, SortDirection, ProductSortColumn, ProductSortEvent } from 'src/app/shared/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductEditContainerComponent } from '../product-edit/product-edit-container.component';

const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: ProductSortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<ProductSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  @Input() products: Product[];
  @Input() error: string;
  @Input() alert: string;
  @Input() isLoading: boolean;
  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProductId = new EventEmitter<string>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() productNameQuery = new EventEmitter<string>();
  @Output() productSortEvent = new EventEmitter<ProductSortEvent>();

  name: string;
  id: string;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {}

  addProduct() {
    this.initializeNewProduct.emit();
    this.modalService.open(ProductEditContainerComponent, { centered: true });
  }

  edit(product) {
    this.editProduct.emit(product);
    this.modalService.open(ProductEditContainerComponent, { centered: true });
  }

  showEditModal(product) {
    this.editProduct.emit(product);
    this.modalService.open(ProductEditContainerComponent, { centered: true });
  }

  saveProduct() {}

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

  closeModal() {
    this.modalService.dismissAll();
  }

  queryProductName(event) {
    if (event.target.value) {
      this.productNameQuery.emit((event.target.value).toString()[0].toUpperCase() +
        (event.target.value).toString().slice(1));
    } else {
      this.productNameQuery.emit('');
    }
  }

  onSort({column, direction}: ProductSortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction !== '') {
      this.productSortEvent.emit({column, direction});
    }
  }

}
