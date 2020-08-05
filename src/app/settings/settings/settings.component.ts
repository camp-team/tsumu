import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UnregisterDialogComponent } from 'src/app/unregister-dialog/unregister-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  unregister() {
    this.dialog.open(UnregisterDialogComponent, {
      restoreFocus: false
    });
  }
}
