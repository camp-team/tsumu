import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { SearchService } from 'src/app/services/search.service';
import { NoteWithUser } from 'src/app/interfaces/note';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  notesWithUser$: Observable<NoteWithUser[]> = this.noteService.getNoteWithUser();

  page = 0;
  maxPage: number;
  items = [];
  loading: boolean;

  constructor(
    private noteService: NoteService,
    private searchService: SearchService,
    private title: Title,
    private meta: Meta) {
    this.onScroll();
    this.title.setTitle('タイムライン | TSUMU');
    this.meta.addTags([
      { name: 'description', content: '全ユーザーが投稿した記録がタイムラインとして表示される' },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'TSUMU - 全ユーザーのタイムライン' },
      { property: 'og:description', content: '全ユーザーが投稿した記録がタイムラインとして表示される' },
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: '/assets/Tsumu.png' },
      { name: 'twitter:card', content: 'Summary Card' },
    ]);
  }

  ngOnInit(): void {
  }

  onScroll() {
    if (!this.loading && (!this.maxPage || this.maxPage > this.page)) {
      this.loading = true;
      this.searchService.index.notes
        .search('', {
          page: this.page++,
        })
        .then((result) => {
          this.maxPage = result.nbPages;
          this.items.push(...result.hits);
          this.loading = false;
        });
    }
  }
}
