import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MypageComponent } from './mypage/mypage.component';
import { MypageProfileComponent } from './mypage-profile/mypage-profile.component';
import { MypageCardComponent } from './mypage-card/mypage-card.component';

const routes: Routes = [
  {
    path: '',
    component: MypageComponent,
    children: [
      {
        path: 'archive',
        component: MypageCardComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: MypageProfileComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypageRoutingModule { }
