import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { Observable } from 'rxjs';
import { Note } from 'src/app/interfaces/note';
import { Title, Meta } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  note$: Observable<Note>;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private title: Title,
    private meta: Meta
  ) {
    route.paramMap.subscribe(params => {
      this.note$ = this.noteService.getNote(
        params.get('id')
      ).pipe(
        tap(note => {
          this.title.setTitle(`${note.todo} | TSUMU`);
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

}
