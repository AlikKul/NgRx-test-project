import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    private readonly afs: AngularFirestore
  ) {}

  getAllUsers(sortColumn, direction) {
    this.usersCollection = this.afs.collection('users', ref => ref
      .orderBy(sortColumn, direction)
    );
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  getLoggedinUser(email) {
    return this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  saveUser(user: User) {
    return this.usersCollection.doc(user.id).update(user);
  }

  addNewUser(user: User) {
    return this.usersCollection.add(user);
  }

  deleteUser(id: string) {
    return this.usersCollection.doc(id).delete();
  }
}
