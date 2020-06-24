import { Component, OnInit, Input } from '@angular/core';
import { NoteWithUser } from 'src/app/interfaces/note';

@Component({
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.scss']
})
export class TimelineCardComponent implements OnInit {
  @Input() noteWithUser: NoteWithUser;

  constructor() {
  }

  ngOnInit(): void {
  }

}
