import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

import { Note } from 'functions/src/interfaces/note';
import { User } from 'functions/src/interfaces/user';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mypage-card',
  templateUrl: './mypage-card.component.html',
  styleUrls: ['./mypage-card.component.scss']
})
export class MypageCardComponent implements OnInit {
  uid: string;
  myNotes$: Observable<Note[]>;
  user$: Observable<User>;

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
      this.myNotes$ = this.noteService.getMyNotes(this.uid);
    });
  }

  ngOnInit(): void {
  }

}
