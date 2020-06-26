import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private snackBar: MatSnackBar) {
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

  getIsEditable(id: string, uid: string): boolean {
    if (id === uid) {
      return true;
    } else {
      return false;
    }
  }
}
