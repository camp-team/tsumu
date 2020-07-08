import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.title.setTitle('お探しのページは見つかりません | TUSUMU');
    this.meta.addTags([
      { name: 'description', content: 'お探しのページは見つかりません。' },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'TSUMU - 404エラー' },
      { property: 'og:description', content: 'お探しのページは見つかりません。' },
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: '/assets/Tsumu.png' },
      { name: 'twitter:card', content: 'Summary Card' },
    ]);
  }

  ngOnInit(): void {
  }

  redirectToTop() {
    this.router.navigate(['']);
  }

}
