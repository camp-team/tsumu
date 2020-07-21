import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../functions/src/interfaces/user';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  isOpened: boolean;
  title = 'tsumu';
  user$: Observable<User> = this.authService.user$;

  constructor(private drawerService: DrawerService, private authService: AuthService) {
    this.drawerService.toggle();
    this.drawerService.isOpen$.subscribe(opened => this.isOpened = opened);
  }

  ngOnInit(): void {
  }

}
