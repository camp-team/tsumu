import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyapgeComponent } from './myapge/myapge.component';

const routes: Routes = [
  {
    path: '',
    component: MyapgeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypageRoutingModule {}
