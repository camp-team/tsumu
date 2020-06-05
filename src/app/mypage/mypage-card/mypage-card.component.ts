import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Note } from 'src/app/interfaces/note';

@Component({
  selector: 'app-mypage-card',
  templateUrl: './mypage-card.component.html',
  styleUrls: ['./mypage-card.component.scss']
})
export class MypageCardComponent implements OnInit {
  uid = this.authService.uid;
  user$: Observable<User> = this.authService.user$;
  myNotes$: Observable<Note[]> = this.noteService.getMyNotes(this.uid);

  constructor(private noteService: NoteService, private authService: AuthService) { }

  ngOnInit(): void {
  }

}
