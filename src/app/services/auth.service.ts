import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User> = this.afAuth.user.pipe(
    switchMap((afUser) => {
      if (afUser) {
        this.db.doc<User>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }),
    tap((user) => {
      if (user) {
        console.log(user);
      } else {
        console.log('なし');
      }
    })
  );

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  login() {
    const provider = new auth.TwitterAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithRedirect(provider);
  }

  logout() {
    this.afAuth.signOut();
  }
}
