import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../shared/interfaces';

@Injectable({providedIn: 'root'})
export class ProductsService {

  constructor(
    private afs: AngularFirestore
  ) {}

  getAllProducts() {
    return this.afs.collection<Product>('products').valueChanges({ idField: 'id' });
  }

  addNewProduct(product: Product) {
    this.afs.collection('products').add(product);
  }

  updateProduct(product: Product) {
    this.afs.collection('products').doc(product.id).update(product);
  }

  deleteProduct(id: string) {
    this.afs.collection('products').doc(id).delete();
  }
}
