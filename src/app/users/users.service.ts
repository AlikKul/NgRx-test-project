import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class UsersService {

  private usersRef: AngularFirestoreCollection<User>;

  constructor(
    private readonly afs: AngularFirestore
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
}
