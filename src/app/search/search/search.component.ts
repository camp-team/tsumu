import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { MatSelectionListChange } from '@angular/material/list';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private searchService: SearchService, private router: Router) {
    this.getFacets('');
    this.search();
  }

  ngOnInit(): void {
    this.inputTagFilter.valueChanges.subscribe((facetQuery: string) => {
      this.getFacets(facetQuery);
      this.updateParams({
        inputTagFilter: facetQuery || null
      });
    });
  }

  // タグの取得を行いプロパティに代入
  getFacets(inputTagFilter: string): void {
    this.searchService.index.users
      .searchForFacetValues('genres', inputTagFilter)
      .then(result => {
        this.tags = result.facetHits;
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

  // チェックボックスで指定したfacetを文字列として取得する
  updateTags(event: MatSelectionListChange) {
    const facetFilters = event.source.selectedOptions.selected.map(
      item => item.value
    );
    console.log(facetFilters);
    this.search(facetFilters);
    this.updateParams({
      tags: facetFilters.length ? facetFilters.join() : null,
      page: 1
    });
  }

  updateParams(params: object) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        params
      }
    });
  }
}
