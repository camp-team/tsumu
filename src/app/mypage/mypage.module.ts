import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypageRoutingModule } from './mypage-routing.module';
import { MyapgeComponent } from './myapge/myapge.component';


@NgModule({
  declarations: [MyapgeComponent],
  imports: [
    CommonModule,
    MypageRoutingModule
  ]
})
export class MypageModule { }
