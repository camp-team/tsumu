import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Note } from '../interfaces/note';
import { firestore, User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: AngularFirestore) { }

  postNote(user: User) {
    const id = this.db.createId();
    this.db.doc<Note>(`notes/${id}`).set({
      id,
      authorId: user.uid,
      createdAt: firestore.Timestamp.now(),
    });
  }
}
