import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

import { Note } from 'src/app/interfaces/note';
import { User } from 'src/app/interfaces/user';
import { UserWithNotes } from 'src/app/interfaces/user-with-notes';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mypage-card',
  templateUrl: './mypage-card.component.html',
  styleUrls: ['./mypage-card.component.scss']
})
export class MypageCardComponent implements OnInit {
  uid: string;
  myNotes$: Observable<Note[]> = this.noteService.getMyNotes(this.uid);
  user$: Observable<User>;
  // userWithNotes$: Observable<UserWithNotes>;

  constructor(
    private authService: AuthService,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.route.queryParamMap.subscribe(map => {
      const query = map.get('id');
      console.log(query);
      this.uid = query;
      this.user$ = this.userService.getUser(query);
    });
  }

  ngOnInit(): void {
  }

}
