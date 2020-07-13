import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { UnregisterDialogComponent } from '../unregister-dialog/unregister-dialog.component';


@NgModule({
  declarations: [SettingsComponent, UnregisterDialogComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
  ]
})
export class SettingsModule { }
