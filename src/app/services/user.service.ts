import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Note } from 'src/app/interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private fns: AngularFireFunctions) {
  }

  saveProfile(uid: string, targets: string[], bio: string) {
    return this.db.doc<User>(`users/${uid}`).update({
      genres: targets,
      bio,
    }).then(() => {
      this.snackBar.open('プロフィールを変更しました！', null, {
        duration: 2000
      });
    });
  }
  getUser(id: string): Observable<User> {
    return this.db.doc<User>(`users/${id}`).valueChanges();
  }

  IsEditable(id: string, uid: string): boolean {
    if (id === uid) {
      return true;
    } else {
      return false;
    }
  }

  deleteUser(id: string) {
    const callable = this.fns.httpsCallable('removeAdminUser');
    return callable(id).toPromise();
    // const notes: Observable<Note[]> = this.db.collection<Note>(`notes`, ref =>
    //   ref.where('authorId', '==', id))
    //   .valueChanges();
    // notes.subscribe(items =>
    //   Promise.all(
    //     items.map(item => {
    //       return this.db.doc(`notes/${item.id}`).delete();
    //     })
    //   )
    // );
  }
}
