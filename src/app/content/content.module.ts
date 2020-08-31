import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content/content.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { DeleteNoteComfirmComponent } from './delete-note-comfirm/delete-note-comfirm.component';


@NgModule({
  declarations: [ContentComponent, DeleteNoteComfirmComponent],
  imports: [
    CommonModule,
    ContentRoutingModule,
    MatCardModule,
    SharedModule,
  ]
})
export class ContentModule { }
