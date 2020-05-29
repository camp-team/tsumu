import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid$: Observable<string> = this.afAuth.user.pipe(
    map(user => {
      return user.uid;
    }),
    tap(uid => {
      return console.log(uid);
    })
  );
  user$: Observable<User> = this.afAuth.user.pipe(
    switchMap((afUser) => {
      if (afUser) {
        return this.db.doc<User>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  login() {
    const provider = new auth.TwitterAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithRedirect(provider);
  }

  logout() {
    this.afAuth.signOut();
  }
}
