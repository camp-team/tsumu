import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$;

  constructor(
    private drawerSerivce: DrawerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  toggle() {
    this.drawerSerivce.toggle();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
