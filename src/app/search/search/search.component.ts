import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { MatSelectionListChange } from '@angular/material/list';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  tags: {
    value: string;
    highlighted: string;
    count: number;
    selected?: boolean;
  }[];
  userItems = [];
  inputTagFilter: FormControl = new FormControl();

  constructor(private searchService: SearchService, private router: Router, private title: Title, private meta: Meta) {
    this.buildTags('');
    this.search();
    this.title.setTitle('ユーザー検索ページ | TSUMU');
    this.meta.addTags([
      { name: 'description', content: 'AngularやFirebaseなどユーザーが学習中のジャンルをタグで絞り込み、ユーザーを検索する。' },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'TSUMU - ジャンルごとにユーザーを検索' },
      { property: 'og:description', content: 'AngularやFirebaseなどユーザーが学習中のジャンルをタグで絞り込み、ユーザーを検索する。' },
      { property: 'og:url', content: location.href },
      { property: 'og:image', content: 'https://tsumu-3eb2a.web.app/assets/Tsumu.png' },
      { property: 'twitter:title', content: 'TSUMU - ジャンルごとにユーザーを検索' },
      { property: 'twitter:url', content: 'https://tsumu-3eb2a.web.app/' },
      { property: 'twitter:description', content: 'AngularやFirebaseなどユーザーが学習中のジャンルをタグで絞り込み、ユーザーを検索する。' },
      { property: 'twitter:image', content: 'https://tsumu-3eb2a.web.app/assets/Tsumu.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]);
  }

  ngOnInit(): void {
    // inputで入力した値をsubscribeで受け取り、メソッドの引数に渡す
    this.inputTagFilter.valueChanges.subscribe((facetQuery: string) => {
      this.buildTags(facetQuery);
      this.updateParams({
        text: facetQuery || null
      });
    });
  }
  // 絞り込みの条件を文字列の配列で受け取り、usersの中からhitするfacetsを持つものを抽出しプロパティに代入
  search(facetFilters?: string[]): void {
    this.searchService.index.users
      .search('', {
        facetFilters,
      })
      .then((result) => (this.userItems = result.hits));
  }
  // paramsとして受け取った値を既存のURLの後ろにmergeする
  updateParams(params: object) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: params
    });
  }
  // タグの取得を行いプロパティに代入
  buildTags(inputTagFilter: string): void {
    this.searchService.index.users
      .searchForFacetValues('genres', inputTagFilter)
      .then(result => {
        this.tags = result.facetHits;
      });
  }
  // チェックボックスで指定したfacetを文字列として取得する
  updateTags(event: MatSelectionListChange) {
    const facetFilters = event.source.selectedOptions.selected.map(
      item => `genres:${item.value}`
    );
    this.search(facetFilters);
    this.updateParams({
      tags: facetFilters.length ? facetFilters.join() : null,
      page: 1
    });
  }
}
