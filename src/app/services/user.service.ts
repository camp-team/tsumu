import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Target } from '../interfaces/target';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  bio: string;

  constructor(private db: AngularFirestore) { }

  saveEdit(uid: string, targets: Target[], bio: string) {
    this.db.doc(`users/${uid}`).update({
      tag: targets[targets.length - 1].genre,
      bio,
    });
  }
}
