import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineCardComponent } from './timeline-card/timeline-card.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [TimelineComponent, TimelineCardComponent],
  imports: [
    CommonModule,
    TimelineRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class TimelineModule { }
