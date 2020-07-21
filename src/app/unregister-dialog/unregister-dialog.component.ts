import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from '../interfaces/note';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unregister-dialog',
  templateUrl: './unregister-dialog.component.html',
  styleUrls: ['./unregister-dialog.component.scss']
})
export class UnregisterDialogComponent implements OnInit {
  id: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private db: AngularFirestore
  ) {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {
  }

  unregister() {
    this.noteService.deleteNotes(this.id);
    // this.noteService.deleteNotes(this.id);
    // this.userService.deleteUser(this.id)
    //   .then(() => {
    //     this.snackBar.open('退会を完了しました。', null, {
    //       duration: 3000
    //     });
    //   }).then(() => {
    //     this.router.navigateByUrl('/');
    //   });
  }
}
