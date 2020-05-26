import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User> = this.afAuth.user.pipe(
    switchMap((afUser) =>
      this.db.doc<User>(`users/${afUser.uid}`).valueChanges()
    )
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
