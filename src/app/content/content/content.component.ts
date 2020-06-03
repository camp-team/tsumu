import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { Observable } from 'rxjs';
import { Note } from 'src/app/interfaces/note';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  note$: Observable<Note>;

  constructor(private route: ActivatedRoute, private noteService: NoteService) {
    route.paramMap.subscribe(params => {
      this.note$ = this.noteService.getNote(
        params.get('id')
      );
    });
  }

  ngOnInit(): void {
  }

}
