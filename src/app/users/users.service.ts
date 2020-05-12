import { Injectable } from '@angular/core';
import { User, PurchaseDetailsQuery, Purchase, SortEvent } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UsersService {

  private usersRef: AngularFirestoreCollection<User>;

  constructor(
    private afs: AngularFirestore
  ) {}

  getUsers(sortEvent: SortEvent): Observable<any> {
    return this.afs.collection('users', ref =>
      ref.orderBy(sortEvent.column, sortEvent.direction)).valueChanges({ idField: 'id' });
  }

  getLoggedInUser(email) {
    return this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  saveUser(user: User): Observable<any> {
    return from(this.usersRef.doc(user.id).update(user));
  }

  addNewUser(user: User): Observable<any> {
    return from(this.usersRef.add(user));
  }

  deleteUser(id: string): Observable<any> {
    return from(this.usersRef.doc(id).delete());
  }

  getAllPurchases(id: string): Observable<any> {
    return from(this.afs.collection('users')
      .doc(id)
      .collection('purchases')
      .valueChanges({ idField: 'id' })
    );
  }

  addPurchase(purchaseWithUserId: {userId: string, purchase: Purchase}): Observable<any> {
    return from(this.usersRef
      .doc(purchaseWithUserId.userId)
      .collection('purchases')
      .add(purchaseWithUserId.purchase));
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
