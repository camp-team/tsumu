import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class mypageComponent implements OnInit {
  uid = this.authService.uid;
  myNotes$ = this.noteService.getMyNotes(this.uid);

  constructor(private noteService: NoteService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
