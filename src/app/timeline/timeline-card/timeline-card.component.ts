import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Note } from 'src/app/interfaces/note';

@Component({
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.scss']
})
export class TimelineCardComponent implements OnInit {
  @Input() note: Note;

  user$: Observable<User> = this.authService.user$;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
