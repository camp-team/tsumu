import { Component, OnInit } from '@angular/core';
import { DeleteNoteComfirmComponent } from '../delete-note-comfirm/delete-note-comfirm.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NoteService } from 'src/app/services/note.service';
import { AuthService } from 'src/app/services/auth.service';
import { Note } from 'src/app/interfaces/note';
import { User } from 'src/app/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public user$: Observable<User> = this.authService.user$;
  public isDeletable: boolean;
  public note$: Observable<Note>;

  private noteId: string;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta
  ) {
    this.route.paramMap.subscribe(params => {
      const noteId = params.get('id');
      this.noteId = noteId;
      this.note$ = this.noteService.getNote(noteId).pipe(
        tap(note => {
          this.title.setTitle(`${note?.todo} | TSUMU`);
          this.meta.addTags([
            { name: 'description', content: 'その日のつみあげを全て表示する' },
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: 'TSUMU - つみあげの詳細' },
            { property: 'og:description', content: 'その日のつみあげを全て表示する' },
            { property: 'og:url', content: location.href },
            { property: 'og:image', content: 'https://tsumu-3eb2a.web.app/assets/Tsumu.png' },
            { property: 'twitter:title', content: 'TSUMU - つみあげの詳細' },
            { property: 'twitter:url', content: 'https://tsumu-3eb2a.web.app/' },
            { property: 'twitter:description', content: 'その日のつみあげを全て表示する' },
            { property: 'twitter:image', content: 'https://tsumu-3eb2a.web.app/assets/Tsumu.png' },
            { name: 'twitter:card', content: 'summary_large_image' },
          ]);
        })
      );
    });
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DeleteNoteComfirmComponent, {
      autoFocus: false,
      restoreFocus: false,
    })
      .afterClosed().subscribe(result => {
        if (result) {
          this.noteService.deleteNote(this.noteId)
            .then(() => {
              this.router.navigate(['/mypage'], {
                queryParams: {
                  id: this.authService.uid
                }
              });
              this.snackBar.open('投稿を削除しました。', null, {
                duration: 2500
              });
            });
        }
      });
  }

}
