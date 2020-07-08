import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  isProcessing: boolean;

  constructor(private authService: AuthService, private title: Title, private meta: Meta) {
    this.title.setTitle('トップページ | TSUMU');
    this.meta.addTags([
      { name: 'description', content: 'サービス説明やログインボタンを表示させるトップページ' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'TSUMU - トップページ' },
      { property: 'og:description', content: 'サービス説明やログインボタンを表示させるトップページ' },
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: '/assets/Tsumu.png' },
      { name: 'twitter:card', content: 'Summary Card' },
    ]);
  }

  ngOnInit(): void {
  }

  login() {
    this.isProcessing = true;
    this.authService.login().finally(() => {
      this.isProcessing = false;
    });
  }
}
