import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from '../interfaces/note';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  createdAt = firestore.Timestamp.now();

  constructor(private db: AngularFirestore) { }

  getAllNotes(): Observable<Note[]> {
    return this.db
      .collection<Note>('notes').valueChanges();
  }
}
