import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { MatSelectionListChange } from '@angular/material/list';

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

  constructor(private searchService: SearchService) {
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


  selectedTags(event: MatSelectionListChange) {
    const facetFilters = event.source.selectedOptions.selected.map(
      (item) => `genres:${item.value}`
    );
    this.search(facetFilters);
  }

}
