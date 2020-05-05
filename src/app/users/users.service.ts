import { Injectable } from '@angular/core';
import { User, PurchaseDetailsQuery } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class UsersService {

  private usersRef: AngularFirestoreCollection<User>;

  constructor(
    private afs: AngularFirestore
  ) {}

  getAllUsers(sortColumn, direction) {
    this.usersRef = this.afs.collection('users', ref => {
      if (direction) {
        return ref.orderBy(sortColumn, direction);
      }
      return ref.orderBy(sortColumn);
    });
    return this.usersRef.valueChanges({ idField: 'id' });
  }

  getLoggedinUser(email) {
    return this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  saveUser(user: User) {
    return this.usersRef.doc(user.id).update(user);
  }

  addNewUser(user: User) {
    return this.usersRef.add(user);
  }

  deleteUser(id: string) {
    return this.usersRef.doc(id).delete();
  }

  getAllPurchases(id: string) {
    this.usersRef = this.afs.collection('users').doc(id).collection('purchases');
    return this.usersRef.valueChanges({ idField: 'id' });
  }

  getPurchaseDetails(purchaseDetailsQuery: PurchaseDetailsQuery) {
    return this.afs.collection('users')
      .doc(purchaseDetailsQuery.userId)
      .collection('purchases')
      .doc(purchaseDetailsQuery.purchaseId)
      .collection<{itemId: string}>('purchasedItems')
      .valueChanges();
  }
}
