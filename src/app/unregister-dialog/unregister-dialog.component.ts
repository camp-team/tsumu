import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-unregister-dialog',
  templateUrl: './unregister-dialog.component.html',
  styleUrls: ['./unregister-dialog.component.scss']
})
export class UnregisterDialogComponent implements OnInit {
  id: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private noteService: NoteService) {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {
  }

  unregister() {
    this.noteService.deleteNotes(this.id);
    this.userService.deleteUser(this.id);
  }
}
