import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { MatSelectionListChange } from '@angular/material/list';
import { FormBuilder } from '@angular/forms';

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
  form = this.fb.group({
    inputTagFilter: [''],
  });

  constructor(private searchService: SearchService, private fb: FormBuilder) {
    this.getFacets();
  }

  ngOnInit(): void {
  }

  // タグの取得を行いプロパティに代入
  getFacets(): void {
    this.searchService.index.users
      .searchForFacetValues('genres', '')
      .then(result => {
        this.tags = result.facetHits;
        // console.log(result.facetHits  , 'resultの中身');
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

  // チェックボックスで指定したfacetを取得し、searchに引数として渡す
  selectedTags(event: MatSelectionListChange) {
    const facetFilters = event.source.selectedOptions.selected.map(
      (item) => `genres:${item.value}`
    );
    this.search(facetFilters);
  }

  // input欄で入力したデータを取得して、searchに引数として渡す
  inputTag() {
    const facetFilters = this.form.value.inputTagFilter;
    // console.log(facetFilters);
    this.search(facetFilters);
  }

}
