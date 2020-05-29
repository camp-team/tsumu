import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from '../interfaces/note';
import { firestore, User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: AngularFirestore) { }

  postNote(note: Note) {
    const id = this.db.createId();
    this.db.doc<Note>(`notes/${id}`).set({
      id,
      text:
        authorId:
      createdAt: firestore.Timestamp.now(),
    });
  }
}
