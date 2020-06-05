import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from '../interfaces/note';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  createdAt = firestore.Timestamp.now();

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar, private router: Router) { }

  postNote(note: Omit<Note, 'id' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();
    return this.db.doc<Note>(`notes/${id}`).set({
      id,
      ...note,
      createdAt: firestore.Timestamp.now()
    }).then(() => {
      this.snackBar.open('つみあげを記録しました！', null, {
        duration: 3000
      });
    }).then(() => {
      this.router.navigateByUrl('/timeline');
    });
  }

  getAllNotes(): Observable<Note[]> {
    return this.db
      .collection<Note>('notes', ref => ref.orderBy('createdAt', 'desc'))
      .valueChanges();
  }

  getNote(id: string): Observable<Note> {
    return this.db.doc<Note>(`notes/${id}`).valueChanges();
  }

  getMyNotes(uid: string): Observable<Note[]> {
    return this.db.collection<Note>('notes', ref =>
      ref.where('authorId', '==', uid))
      .valueChanges();
  }
}
