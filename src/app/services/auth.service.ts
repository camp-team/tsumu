import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../functions/src/interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string;
  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((afUser) => {
        if (afUser) {
          this.uid = afUser.uid;
          return this.db.doc<User>(`users/${afUser.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  login(): Promise<void> {
    const provider = new auth.TwitterAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth.signInWithRedirect(provider);
  }

  logout() {
    this.afAuth.signOut();
  }
}
