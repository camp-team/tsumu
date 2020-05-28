import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  postNote() {
    console.log('test');
  }
}
