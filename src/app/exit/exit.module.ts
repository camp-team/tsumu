import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExitRoutingModule } from './exit-routing.module';
import { ExitComponent } from './exit.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ExitComponent],
  imports: [
    CommonModule,
    ExitRoutingModule,
    SharedModule,
  ]
})
export class ExitModule { }
