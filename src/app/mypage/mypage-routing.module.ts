import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mypageComponent } from './mypage/mypage.component';

const routes: Routes = [
  {
    path: '',
    component: mypageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypageRoutingModule { }
