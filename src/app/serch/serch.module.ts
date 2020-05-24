import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerchRoutingModule } from './serch-routing.module';
import { SerchComponent } from './serch/serch.component';


@NgModule({
  declarations: [SerchComponent],
  imports: [
    CommonModule,
    SerchRoutingModule
  ]
})
export class SerchModule { }
