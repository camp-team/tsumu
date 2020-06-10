import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserWithTagsAndBio } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  bio: string;

  constructor(private db: AngularFirestore) { }

  saveEdit(uid: string, targets: string[], bio: string) {
    return this.db.doc<UserWithTagsAndBio>(`users/${uid}`).update({
      tags: targets,
      bio,
    });
  }
}
