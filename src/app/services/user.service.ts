import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Target } from '../interfaces/target';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  saveEdit(uid: string, targets: Target[]) {
    this.db.doc(`users/${uid}`).update({
      tag: targets[targets.length - 1].genre
    });
  }
}
