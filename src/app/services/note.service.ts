import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Note, NoteWithUser } from '../interfaces/note';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  createdAt = firestore.Timestamp.now();


  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router, ) { }

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

  getNoteWithUser(): Observable<NoteWithUser[]> {
    let notes: Note[];
    return this.db.collection('notes').valueChanges().pipe(
      // noteコレクションのデータをuserデータに差し替える
      switchMap((posts: Note[]) => {
        notes = posts;
        if (notes.length) {
          // 重複しているauthorIdをfilterで落とし、被りのないauthorIdの配列を定義
          const uniqueAuthorIds: string[] = notes.filter((element, index, array) => {
            // findIndexの条件に最初に合致するインデックス番号と配列のインデックス番号を比較して同じものだけ抽出する
            return array.findIndex((value => value.authorId === element.authorId)) === index;
            // ユニークなauthorIdを持つnoteからauthorIdを参照する
          }).map(note => note.authorId);
          // uniqueAuthorIdsの配列をまとめて受け取り、userのドキュメントに変換してまとめて流す
          return combineLatest(uniqueAuthorIds.map(id => {
            return this.db.doc(`users/${id}`).valueChanges();
          }));
        } else {
          return of(null);
        }
      }),
      map((users: User[]) => {
        // notes配列の要素一つ一つに対してauthorIdと一致するuserデータを混ぜる
        return notes.map((note: Note) => {
          const noteWithUser: NoteWithUser = {
            ...note,
            author: users.find(user => user.id === note.authorId)
          };
          return noteWithUser;
        });
      })
    );
  }

  getNote(id: string): Observable<Note> {
    return this.db.doc<Note>(`notes/${id}`).valueChanges();
  }

  getMyNotes(uid: string): Observable<Note[]> {
    return this.db.collection<Note>('notes', ref =>
      ref.where('authorId', '==', uid))
      .valueChanges();
  }

  deleteNotes(id: string): Observable<void> {
    return this.db.collection<Note>('notes', ref =>
      ref.where('authorId', '==', id))
      .valueChanges()
      .pipe(
        map(notes => {
          notes.map(note => {
            return this.db.doc(`notes/${note.id}`).delete();
          });
        })
      );
  }
}
