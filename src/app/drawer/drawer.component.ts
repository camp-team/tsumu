import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../functions/src/interfaces/user';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  constructor(private authService: AuthService) { }

  ngOnInit(): void { }
}
