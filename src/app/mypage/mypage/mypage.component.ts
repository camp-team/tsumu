import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  navLinks = [
    {
      path: './',
      label: 'プロフィール',
    },
    {
      path: 'archive',
      label: 'つみあげ記録',
    },
    {
      path: 'settings',
      label: '設定',
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
