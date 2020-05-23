import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SerchComponent } from './serch/serch.component';

const routes: Routes = [
  {
    path: '',
    component: SerchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerchRoutingModule {}
