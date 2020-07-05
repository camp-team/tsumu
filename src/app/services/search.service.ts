import algoliasearch from 'algoliasearch/lite';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

// 自分が作成したAlgoliaのアプリケーションと連携するためのキーを取得
const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Algolia側で作成したインデックスを初期化し、componentからindexにアクセスできるようにする
  index = {
    users: searchClient.initIndex('users'),
    notes: searchClient.initIndex('notes')
  };

  constructor() { }
}
