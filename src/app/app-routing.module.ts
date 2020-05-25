import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'note',
    loadChildren: () => import('./note/note.module').then((m) => m.NoteModule),
  },
  {
    path: 'timeline',
    loadChildren: () =>
      import('./timeline/timeline.module').then((m) => m.TimelineModule),
  },
  {
    path: 'serch',
    loadChildren: () =>
      import('./serch/serch.module').then((m) => m.SerchModule),
  },
  {
    path: 'mypage',
    loadChildren: () =>
      import('./mypage/mypage.module').then((m) => m.MypageModule),
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./terms/terms.module').then((m) => m.TermsModule),
  },
  {
    path: 'legal',
    loadChildren: () =>
      import('./legal/legal.module').then((m) => m.LegalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
