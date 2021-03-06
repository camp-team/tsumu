import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private fns: AngularFireFunctions, ) {
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

  async deleteUser(id: string) {
    const callable = this.fns.httpsCallable('removeAdminUser');
    return callable(id).toPromise();
  }
}
