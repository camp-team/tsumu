import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../shared/shared.module';
import { UserCardComponent } from './user-card/user-card.component';


@NgModule({
  declarations: [SearchComponent, UserCardComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
  ]
})
export class SearchModule { }
