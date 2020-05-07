import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../shared/interfaces';
import { Observable, from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductsService {

  constructor(
    private afs: AngularFirestore
  ) {}

  getProducts(name) {
    if (!name) {
      return this.afs.collection<Product>('products').valueChanges({ idField: 'id' });
    }
    return this.afs.collection<Product>('products', ref => {
      return ref.orderBy('name').startAt(name).endAt(name + '\uf8ff');
    }).valueChanges({ idField: 'id' });
  }

  addNewProduct(product: Product): Observable<any> {
    return from(this.afs.collection('products').add(product));
  }

  updateProduct(product: Product): Observable<any> {
    return from(this.afs.collection('products').doc(product.id).update(product));
  }

  deleteProduct(id: string): Observable<any> {
    return from(this.afs.collection('products').doc(id).delete());
  }
}
