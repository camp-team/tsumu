import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  notes$ = this.noteService.getAllNotes().pipe(
    tap(data => console.log(data))
  );

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

}
