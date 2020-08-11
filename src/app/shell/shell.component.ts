import { Component, OnInit, NgZone } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  sidenavMode: string;
  isOpened: boolean;
  title = 'tsumu';
  user$: Observable<User> = this.authService.user$;

  constructor(
    private drawerService: DrawerService,
    private authService: AuthService,
    private ngZone: NgZone) {
    this.drawerService.toggle();
    this.drawerService.isOpen$.subscribe(opened => this.isOpened = opened);
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.handleResizeWindow(window.innerWidth);
      });
    };
  }

  ngOnInit(): void {
    this.handleResizeWindow(window.innerWidth);
  }

  handleResizeWindow(width: number) {
    if (800 < width) {
      this.sidenavMode = 'side';
    } else {
      this.sidenavMode = 'over';
    }
  }

}
