import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypageRoutingModule } from './mypage-routing.module';
import { MypageComponent } from './mypage/mypage.component';
import { MypageCardComponent } from './mypage-card/mypage-card.component';

import { SharedModule } from '../shared/shared.module';
import { MypageProfileComponent } from './mypage-profile/mypage-profile.component';

@NgModule({
  declarations: [MypageComponent, MypageCardComponent, MypageProfileComponent],
  imports: [
    CommonModule,
    MypageRoutingModule,
    SharedModule,
  ]
})
export class MypageModule { }
