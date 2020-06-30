import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  isOpened: boolean;
  title = 'tsumu';

  constructor(private drawerService: DrawerService) {
    this.drawerService.toggle();
    this.drawerService.isOpen$.subscribe(opened => this.isOpened = opened);
  }

  ngOnInit(): void {
  }

}
