import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { tap } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  notes$ = this.noteService.getAllNotes().pipe(
    tap(data => console.log(data))
  );

  page = 0;
  maxPage: number;
  items = [];
  loading: boolean;

  constructor(private noteService: NoteService, private searchService: SearchService) {
    this.onScroll();
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
