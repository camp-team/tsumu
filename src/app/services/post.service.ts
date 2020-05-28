import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  user$ = this.authService.user$.subscribe();

  constructor(private db: AngularFirestore, private authService: AuthService) {}

  postNote() {
    return this.db.doc(`notes/${this.user$}`);
    // console.log('test');
  }
}
