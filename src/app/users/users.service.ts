import { Injectable } from '@angular/core';
import { User, PurchaseDetailsQuery, Purchase, UserSortEvent } from '../shared/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({providedIn: 'root'})
export class UsersService {

  constructor(
    private afs: AngularFirestore
  ) {}

  getUsers(sortEvent): Observable<any> {
    return this.afs.collection('users', ref =>
      ref.orderBy(sortEvent.column, sortEvent.direction)).valueChanges({ idField: 'id' });
  }

  getLoggedInUser(email) {
    return this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  updateUser(user: User): Observable<any> {
    return from(this.afs.collection('users')
      .doc(user.id)
      .update(user)
    );
  }

  addNewUser(user: User): Observable<any> {
    return from(this.afs.collection('users')
      .add(user)
    );
  }

  deleteUser(id: string): Observable<any> {
    return from(this.afs.collection('users')
      .doc(id)
      .delete()
    );
  }

  getAllPurchases(id: string): Observable<any> {
    return from(this.afs.collection('users')
      .doc(id)
      .collection('purchases')
      .valueChanges({ idField: 'id' })
    );
  }

  addPurchase(purchaseWithUserId: {userId: string, purchase: Purchase, totalMoneySpent: number}): Observable<any> {
    return from(this.afs.collection('users')
      .doc(purchaseWithUserId.userId)
      .collection('purchases')
      .add(purchaseWithUserId.purchase)).pipe(
        tap(() => {
          this.afs.collection('users')
            .doc(purchaseWithUserId.userId)
            .update({totalMoneySpent: purchaseWithUserId.totalMoneySpent});
          purchaseWithUserId.purchase.purchasedItems.forEach(id => {
            this.afs.collection('products')
              .doc(id)
              .update({ salesCount: firebase.firestore.FieldValue.increment(1) });
          });
        })
      );
  }

  getPurchasedProductsIds(purchaseDetailsQuery: PurchaseDetailsQuery) {
    return this.afs.collection('users')
      .doc(purchaseDetailsQuery.userId)
      .collection('purchases')
      .doc(purchaseDetailsQuery.purchaseId)
      .valueChanges().pipe(
          map((purchase: Purchase) => purchase.purchasedItems)
        );
  }
}
